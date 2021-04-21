import {Type} from './type';

export const ANNOTATIONS = '__annotations__';

/**
 * Convince closure compiler that the wrapped function has no side-effects.
 *
 * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
 * allow us to execute a function but have closure compiler mark the call as no-side-effects.
 * It is important that the return value for the `noSideEffects` function be assigned
 * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
 * compiler.
 */
export function noSideEffects<T>(fn: () => T): T {
    return {toString: fn}.toString() as unknown as T;
}

/**
 * An interface implemented by all Angular type decorators, which allows them to be used as
 * decorators as well as Angular syntax.
 *
 * ```
 * @ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @publicApi
 */
export interface TypeDecorator {
    /**
     * Invoke as decorator.
     */<T extends Type<any>>(type: T): T;

    // Make TypeDecorator assignable to built-in ParameterDecorator type.
    // ParameterDecorator is declared in lib.d.ts as a `declare type`
    // so we cannot declare this interface as a subtype.
    // see https://github.com/angular/angular/issues/3379#issuecomment-126169417
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
}

/**
 * @suppress {globalThis}
 */
export function makeDecorator<T>(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (type: Type<T>) => void,
    typeFn?: (type: Type<T>, ...args: any[]) => void):
    { new(...args: any[]): any; (...args: any[]): any; (...args: any[]): (cls: any) => any } {
    return noSideEffects(() => {
        const metaCtor = makeMetadataCtor(props);

        function DecoratorFactory(
            this: unknown | typeof DecoratorFactory, ...args: any[]): (cls: Type<T>) => any {
            if (this instanceof DecoratorFactory) {
                metaCtor.call(this, ...args);
                return this as typeof DecoratorFactory;
            }

            const annotationInstance = new (DecoratorFactory as any)(...args);
            return function TypeDecorator(cls: Type<T>) {
                if (typeFn) typeFn(cls, ...args);
                // Use of Object.defineProperty is important since it creates non-enumerable property which
                // prevents the property is copied during subclassing.
                const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                    (cls as any)[ANNOTATIONS] :
                    Object.defineProperty(cls, ANNOTATIONS, {value: []})[ANNOTATIONS];
                annotations.push(annotationInstance);


                if (additionalProcessing) additionalProcessing(cls);

                return cls;
            };
        }

        if (parentClass) {
            DecoratorFactory.prototype = Object.create(parentClass.prototype);
        }

        DecoratorFactory.prototype.metadataName = name;
        (DecoratorFactory as any).annotationCls = DecoratorFactory;
        return DecoratorFactory as any;
    });
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
    return function ctor(this: any, ...args: any[]) {
        if (props) {
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}

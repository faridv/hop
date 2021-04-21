import * as ts from 'typescript';
import {existsSync, readFileSync} from 'fs';
import {dirname, resolve} from 'path';

import {makeDecorator, TypeDecorator} from './decorators';
import {Type} from './type';
import {getLineAndCharacterFromPosition} from './line-mappings';

export type CallExpressionDecorator = ts.Decorator & {
    expression: ts.CallExpression;
};

export interface ComponentDecorator {
    (obj: Component): TypeDecorator;

    new(obj: Component): Component;
}


export interface Component {
    templateUrl?: string | string[];
    template?: string;
}

export const Component: ComponentDecorator = makeDecorator(
    'Component', (c: Component = {}) => ({...c}),
    undefined, undefined, (type: Type<any>, meta: Component) => console.log(type, meta));

export interface ResolvedTemplate {
    /** Class declaration that contains this template. */
    container: ts.ClassDeclaration;
    /** File content of the given template. */
    content: string;
    /** Start offset of the template content (e.g. in the inline source file) */
    start: number;
    /** Whether the given template is inline or not. */
    inline: boolean;
    /** Path to the file that contains this template. */
    filePath: string;
    /**
     * Gets the character and line of a given position index in the template.
     * If the template is declared inline within a TypeScript source file, the line and
     * character are based on the full source file content.
     */
    getCharacterAndLineOfPosition: (pos: number) => {
        character: number, line: number
    };
}

export type Import = {
    name: string,
    importModule: string,
    node: ts.ImportDeclaration
};

/** Gets import information about the specified identifier by using the Type checker. */
export function getImportOfIdentifier(typeChecker: ts.TypeChecker, node: ts.Identifier): Import |
    null {
    const symbol = typeChecker.getSymbolAtLocation(node);

    if (!symbol || !symbol.declarations.length) {
        return null;
    }

    const decl = symbol.declarations[0];

    if (!ts.isImportSpecifier(decl)) {
        return null;
    }

    const importDecl = decl.parent.parent.parent;

    if (!ts.isStringLiteral(importDecl.moduleSpecifier)) {
        return null;
    }

    return {
        // Handles aliased imports: e.g. "import {Component as myComp} from ...";
        name: decl.propertyName ? decl.propertyName.text : decl.name.text,
        importModule: importDecl.moduleSpecifier.text,
        node: importDecl
    };
}

/** Checks whether a given node is a function like declaration. */
export function isFunctionLikeDeclaration(node: ts.Node): node is ts.FunctionLikeDeclaration {
    return ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) ||
        ts.isArrowFunction(node) || ts.isFunctionExpression(node) ||
        ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node);
}

/**
 * Unwraps a given expression TypeScript node. Expressions can be wrapped within multiple
 * parentheses or as expression. e.g. "(((({exp}))))()". The function should return the
 * TypeScript node referring to the inner expression. e.g "exp".
 */
export function unwrapExpression(node: ts.Expression | ts.ParenthesizedExpression): ts.Expression {
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) {
        return unwrapExpression(node.expression);
    } else {
        return node;
    }
}

export function getCallDecoratorImport(
    typeChecker: ts.TypeChecker, decorator: ts.Decorator): Import | null {
    // Note that this does not cover the edge case where decorators are called from
    // a namespace import: e.g. "@core.Component()". This is not handled by Ngtsc either.
    if (!ts.isCallExpression(decorator.expression) ||
        !ts.isIdentifier(decorator.expression.expression)) {
        return null;
    }

    const identifier = decorator.expression.expression;
    return getImportOfIdentifier(typeChecker, identifier);
}

/**
 * Gets the text of the given property name. Returns null if the property
 * name couldn't be determined statically.
 */
export function getPropertyNameText(node: ts.PropertyName): string | null {
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) {
        return node.text;
    }
    return null;
}

type PropertyNameWithText = Exclude<ts.PropertyName, ts.ComputedPropertyName>;

/** Checks whether the given property name has a text. */
export function hasPropertyNameText(node: ts.PropertyName): node is PropertyNameWithText {
    return ts.isStringLiteral(node) || ts.isNumericLiteral(node) || ts.isIdentifier(node);
}

const LF_CHAR = 10;
const CR_CHAR = 13;
const LINE_SEP_CHAR = 8232;
const PARAGRAPH_CHAR = 8233;

/**
 * Computes the line start map of the given text. This can be used in order to
 * retrieve the line and character of a given text position index.
 */
export function computeLineStartsMap(text: string): number[] {
    const result: number[] = [0];
    let pos = 0;
    while (pos < text.length) {
        const char = text.charCodeAt(pos++);
        // Handles the "CRLF" line break. In that case we peek the character
        // after the "CR" and check if it is a line feed.
        if (char === CR_CHAR) {
            if (text.charCodeAt(pos) === LF_CHAR) {
                pos++;
            }
            result.push(pos);
        } else if (char === LF_CHAR || char === LINE_SEP_CHAR || char === PARAGRAPH_CHAR) {
            result.push(pos);
        }
    }
    result.push(pos);
    return result;
}


/**
 * Gets all decorators which are imported from an Angular package (e.g. "@angular/core")
 * from a list of decorators.
 */
export function getAngularDecorators(
    typeChecker: ts.TypeChecker, decorators: ReadonlyArray<ts.Decorator>): any[] {
    return decorators.map(node => ({node, importData: getCallDecoratorImport(typeChecker, node)}))
        .filter(({importData}) => importData && importData.importModule.startsWith('@angular/'))
        .map(({node, importData}) => ({
            node: node as CallExpressionDecorator,
            name: importData!.name,
            moduleName: importData!.importModule,
            importNode: importData!.node
        }));
}

/**
 * Visitor that can be used to determine Angular templates referenced within given
 * TypeScript source files (inline templates or external referenced templates)
 */
export class NgComponentTemplateVisitor {
    resolvedTemplates: ResolvedTemplate[] = [];

    constructor(public typeChecker: ts.TypeChecker) {
    }

    visitNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            this.visitClassDeclaration(node as ts.ClassDeclaration);
        }

        ts.forEachChild(node, n => this.visitNode(n));
    }

    private visitClassDeclaration(node: ts.ClassDeclaration) {
        if (!node.decorators || !node.decorators.length) {
            return;
        }

        const ngDecorators = getAngularDecorators(this.typeChecker, node.decorators);
        const componentDecorator = ngDecorators.find(dec => dec.name === 'Component');

        // In case no "@Component" decorator could be found on the current class, skip.
        if (!componentDecorator) {
            return;
        }

        const decoratorCall = componentDecorator.node.expression;

        // In case the component decorator call is not valid, skip this class declaration.
        if (decoratorCall.arguments.length !== 1) {
            return;
        }

        const componentMetadata = unwrapExpression(decoratorCall.arguments[0]);

        // Ensure that the component metadata is an object literal expression.
        if (!ts.isObjectLiteralExpression(componentMetadata)) {
            return;
        }

        const sourceFile = node.getSourceFile();
        const sourceFileName = sourceFile.fileName;

        // Walk through all component metadata properties and determine the referenced
        // HTML templates (either external or inline)
        componentMetadata.properties.forEach(property => {
            if (!ts.isPropertyAssignment(property)) {
                return;
            }

            const propertyName = getPropertyNameText(property.name);

            // In case there is an inline template specified, ensure that the value is statically
            // analyzable by checking if the initializer is a string literal-like node.
            if (propertyName === 'template' && ts.isStringLiteralLike(property.initializer)) {
                // Need to add an offset of one to the start because the template quotes are
                // not part of the template content.
                const templateStartIdx = property.initializer.getStart() + 1;
                const filePath = resolve(sourceFileName);
                this.resolvedTemplates.push({
                    filePath: filePath,
                    container: node,
                    content: property.initializer.text,
                    inline: true,
                    start: templateStartIdx,
                    getCharacterAndLineOfPosition: pos =>
                        ts.getLineAndCharacterOfPosition(sourceFile, pos + templateStartIdx)
                });
            }
            if (propertyName === 'templateUrl' && ts.isStringLiteralLike(property.initializer)) {
                const templatePath = resolve(dirname(sourceFileName), property.initializer.text);

                // In case the template does not exist in the file system, skip this
                // external template.
                if (!existsSync(templatePath)) {
                    return;
                }

                const fileContent = readFileSync(templatePath, 'utf8');
                const lineStartsMap = computeLineStartsMap(fileContent);

                this.resolvedTemplates.push({
                    filePath: templatePath,
                    container: node,
                    content: fileContent,
                    inline: false,
                    start: 0,
                    getCharacterAndLineOfPosition: pos => getLineAndCharacterFromPosition(lineStartsMap, pos),
                });
            }
        });
    }
}

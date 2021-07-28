import * as $ from 'jquery';
import * as Handlebars from 'handlebars';
import { addHandlebarsHelpers } from './handlebar.helper';
import jqXHR = JQuery.jqXHR;
// import * as Template7 from './template7.js';

export default class TemplateHelper {

    private static _instance: TemplateHelper;

    constructor() {
        this.addHelpers();
    }

    private zeroFill(num, size = 2): string {
        let output = num.toString();
        while (output.length < size)
            output = "0" + output;
        return output;
    }

    private addHelpers(): void {
        addHandlebarsHelpers(this);
    }

    public static get instance(): TemplateHelper {
        return this._instance || (this._instance = new this());
    }

    public load(path: string, file: string): jqXHR {
        return $.ajax(
            {
                url: 'assets/templates/' + path + '/' + file + '.html'
                , contentType: 'text/x-handlebars-template'
                // , contentType: 'text/template7'
            });
    }

    public loading(start: boolean = true): void {
        const method = start ? 'addClass' : 'removeClass';
        this[method]('loading', '#app');
    }

    public render(template: any, data: any, $container: any, mode: string = 'html', callback?: (() => any)): void {
        const self = this;
        if (typeof template === 'string') {
            this.generateOutput(template, data, $container, mode, callback);
        } else {
            try {
                template.done((tmpl: string) => {
                    self.generateOutput(tmpl, data, $container, mode, callback);
                });
            } catch (error) {
                console.error('failed loading template', error);
            }
        }
    }

    private generateOutput(template: string, data: any, $container: any, mode: string = 'html', callback?: any) {
        const HandlebarsTemplate = Handlebars.compile(template);
        const output = HandlebarsTemplate(data);
        // const output = new Handlebars.SafeString(Handlebars.escapeExpression(HandlebarsTemplate(data)));
        // console.warn(output);
        if (!($container instanceof $)) {
            $container = $($container[0]);
        }
        if (mode === 'html') {
            $container.empty();
            // mode = 'append';
        }
        try {
            $container[mode](output).promise().done(($parent) => {
                if (typeof callback === 'function')
                    callback($parent);
            });
        } catch (error) {
            console.error(error);
        }
    }

    /*
    * Helper methods
    */
    public getElement(element: any = 'body'): JQuery {
        return (typeof element === 'string') ? $(element) : element;
    }

    public addClass(classToAdd: string, element: any): void {
        const $element = this.getElement(element);
        $element.addClass(classToAdd);
    }

    public hasClass(classToCheck: string, element?: any): boolean {
        const $element = this.getElement(element);
        return $element.hasClass(classToCheck);
    }

    public removeClass(classToRemove: string, element: any): void {
        const $element = this.getElement(element);
        $element.removeClass(classToRemove);
    }

    public prepend(content: string, element: any): void {
        const $element = this.getElement(element);
        $element.prepend(content);
    }

    public removeClassIfContains(element: string = 'body', text: string = 'layout-'): void {
        const classList: string[] = $(element).attr("class").split(" ");
        let newClassList: string[] = [];
        for (let i: number = 0; i < classList.length; i++) {
            let result: number = classList[i].search(/itemnx+/);
            if (result <= 0)
                newClassList[newClassList.length] = classList[i];
        }
        $(element).removeClass().addClass(newClassList.join(" "));
    }

    public isOverflown($element) {
        const element = $element[0];
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

}

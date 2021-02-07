import * as $ from 'jquery';
import jqXHR = JQuery.jqXHR;
import * as Handlebars from 'handlebars';
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
        const self = this;

        Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        });
        Handlebars.registerHelper("addComma", function (value, options) {
            value += '';
            let x = value.split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? '.' + x[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        });
        Handlebars.registerHelper('times', function (n, block) {
            // Loop a block starting at 0
            let accum = '';
            for (let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });
        Handlebars.registerHelper('debug', function (value, options) {
            console.log(value);
        });
        Handlebars.registerHelper('extractTime', function (value, options) {
            if (typeof value === "undefined" || !value || +value.split('-')[0] === 1900)
                return '';
            let splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
            return value.split(splitter)[1];
        });
        Handlebars.registerHelper('for', function (from, to, incr, block) {
            // For loop {{#for i to steps}} -> {{#for 0 10 2}}
            let accum = '';
            for (let i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        });
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    // tslint:disable-next-line:triple-equals
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    // tslint:disable-next-line:triple-equals
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });
        Handlebars.registerHelper('ifCondNot', function (v1, v2, options) {
            if (v1 !== v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
        Handlebars.registerHelper('stringify', function (obj, options) {
            if (typeof obj === "object") {
                $.each(obj, function () {
                    delete this.raw;
                });
            }
            return (typeof obj === "object") ? JSON.stringify(obj) : obj;
        });
        Handlebars.registerHelper('select', function (value, options) {
            let $el = $('<select />').html(options.fn(this));
            if (typeof value === "undefined" || !value || value === "")
                return $el.html();
            $el.find('[value="' + value + '"]').attr({'selected': 'selected'});
            return $el.html();
        });
        Handlebars.registerHelper('replace', function (haystack, needle, replace, options) {
            return haystack.replace(needle, replace);
        });
        Handlebars.registerHelper('find', function (needle, haystack, options) {
            if (typeof haystack === "undefined" || !haystack)
                return false;
            if (typeof haystack === "string" && haystack.indexOf(',') !== -1)
                haystack = haystack.split(',');
            else
                haystack = !(haystack instanceof Array) ? [haystack] : haystack;
            let found = false;
            if (haystack.length) {
                for (let i in haystack)
                    // tslint:disable-next-line:triple-equals
                    if (needle == haystack[i])
                        found = true;
            }
            return (found) ? options.fn(this) : options.inverse(this);
        });
        Handlebars.registerHelper('br', function (text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
            return new Handlebars.SafeString(text);
        });
        Handlebars.registerHelper('safe', function (text) {
            text = text
                .replace(/&nbsp;|\u00a0/gm, ' ')
                .replace(/&zwnj;|\u200C/gm, '‌')
                .replace(/(\r\n|\n|\r)/gm, '<br />');
            return new Handlebars.SafeString(text);
        });
        Handlebars.registerHelper('sec2time', function (value, options) {
            const time = new Date(0, 0, 0, 0, 0, Math.abs(value), 0);
            return self.zeroFill(time.getHours()) + ":" + self.zeroFill(time.getMinutes()) + ":" + self.zeroFill(time.getSeconds());
        });
        Handlebars.registerHelper('getSeconds', function (value, options) {
            try {
                const splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
                let times = value.split(splitter)[1].toString().split(":");
                return parseInt(times[2], 10) + (parseInt(times[1], 10) * 60) + (parseInt(times[0], 10) * 3600);
            } catch (e) {
                console.error('cannot convert "' + value + '" to seconds.', e);
            }
        });
        Handlebars.registerHelper('min2time', function (value, options) {
            const time = new Date(0, 0, 0, 0, Math.abs(value), 0, 0);
            return self.zeroFill(time.getHours()) + ":" + self.zeroFill(time.getMinutes()) + ":" + self.zeroFill(time.getSeconds());
        });
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

    public render(template: any, data: any, $container: any, mode: string = 'html', callback?: any): void {
        const self = this;
        if (typeof template === 'string') {
            this.generateOutput(template, data, $container, mode, callback);
        } else {
            try {
                template.done(function (tmpl: string) {
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

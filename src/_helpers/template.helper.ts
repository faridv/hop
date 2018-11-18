import * as $ from 'jquery';
import jqXHR = JQuery.jqXHR;
import Template7 from 'template7';
import ClockHelper from "./clock.helper";

export default class TemplateHelper {

    private static _instance: TemplateHelper;

    constructor() {
        this.addHelpers();
    }

    private addHelpers(): void {
        Template7.registerHelper("math", function (lvalue, operator, rvalue, options) {
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
        Template7.registerHelper('times', function (n, block) {
            // Loop a block starting at 0
            let accum = '';
            for (let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });
        Template7.registerHelper('debug', function (value, options) {
            console.log(value);
        });
        Template7.registerHelper('extractTime', function (value, options) {
            if (typeof value === "undefined" || !value || +value.split('-')[0] === 1900)
                return '';
            let splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
            return value.split(splitter)[1];
        });
        Template7.registerHelper('for', function (from, to, incr, block) {
            // For loop {{#for i to steps}} -> {{#for 0 10 2}}
            let accum = '';
            for (let i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        });
        Template7.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '!=':
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
        Template7.registerHelper('ifCondNot', function (v1, v2, options) {
            if (v1 !== v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
        Template7.registerHelper('stringify', function (obj, options) {
            if (typeof obj === "object") {
                $.each(obj, function () {
                    delete this.raw;
                });
            }
            return (typeof obj === "object") ? JSON.stringify(obj) : obj;
        });
        Template7.registerHelper('select', function (value, options) {
            let $el = $('<select />').html(options.fn(this));
            if (typeof value === "undefined" || !value || value === "")
                return $el.html();
            // if (typeof value === "string" && value.indexOf(',') !== -1) {
            //     let values = value.split(',');
            //     $.each(values, function () {
            //         $el.find('[value=' + this + ']').attr({'selected': 'selected'});
            //     });
            // } else
            $el.find('[value="' + value + '"]').attr({'selected': 'selected'});
            return $el.html();
        });
        Template7.registerHelper('replace', function (haystack, needle, replace, options) {
            return haystack.replace(needle, replace);
        });
        Template7.registerHelper('find', function (needle, haystack, options) {
            if (typeof haystack === "undefined" || !haystack)
                return false;
            if (typeof haystack === "string" && haystack.indexOf(',') !== -1)
                haystack = haystack.split(',');
            else
                haystack = !(haystack instanceof Array) ? [haystack] : haystack;
            let found = false;
            if (haystack.length) {
                for (let i in haystack)
                    if (needle == haystack[i])
                        found = true;
            }
            return (found) ? options.fn(this) : options.inverse(this);
        });
        // Template7.registerHelper('br', function (text) {
        //     text = Template7.Utils.escapeExpression(text);
        //     text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
        //     return new Template7.SafeString(text);
        // });
    }

    public static get instance(): TemplateHelper {
        return this._instance || (this._instance = new this());
    }

    public load(path: string, file: string): jqXHR {
        return $.ajax(
            {
                url: 'assets/templates/' + path + '/' + file + '.html'
                , contentType: 'text/template7'
            });
    }

    loading(start: boolean = true): void {
        const method = start ? 'addClass' : 'removeClass';
        $('#app')[method]('loading');
    }

    public render(template: jqXHR, data: any, $container: any, mode: string = 'html', callback?: any): void {
        template.done(function (tmpl: string) {
            const Template7Template = Template7.compile(tmpl);
            const output = Template7Template(data);
            if (mode === 'html')
                $container.empty();
            $container[mode](output).promise().done(function ($parent) {
                if (typeof callback === 'function')
                    callback($parent);
            });
        });
    }

    public addClass(classToAdd: string, element: string = 'body'): void {
        $(element).addClass(classToAdd);
    }

    public removeClass(classToRemove: string, element: string = 'body'): void {
        $(element).removeClass(classToRemove);
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

}
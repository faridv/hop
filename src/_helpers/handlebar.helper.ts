import * as Handlebars from "handlebars";
import * as $ from 'jquery';
import { ConfigHelper } from './config.helper';

export function addHandlebarsHelpers(context): void {
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
        $el.find('[value="' + value + '"]').attr({ 'selected': 'selected' });
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
        return context.zeroFill(time.getHours()) + ":" + context.zeroFill(time.getMinutes()) + ":" + context.zeroFill(time.getSeconds());
    });
    Handlebars.registerHelper('min2time', function (value, options) {
        const time = new Date(0, 0, 0, 0, Math.abs(value), 0, 0);
        return context.zeroFill(time.getHours()) + ":" + context.zeroFill(time.getMinutes()) + ":" + context.zeroFill(time.getSeconds());
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

    Handlebars.registerHelper('getCityOptions', function (value, options) {
        const locations = ConfigHelper.get('locations');
        let output = '';
        locations.forEach((location: { city: string; title: string; coords: number[] }) => {
            output += `<option value="${location.coords[0]},${location.coords[1]}">${location.title}</option>`;
        });
        return output
    });
}

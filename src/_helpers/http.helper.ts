import * as $ from "jquery";
import jqXHR = JQuery.jqXHR;

export class HttpHelper {

    public static get(url: string, data: object = {}, dataType: string = 'json'): JQuery.jqXHR {
        return $.get(url, data, (d) => {
            return d;
        }, dataType);
    }

    public static post(url: string, data: object = {}, dataType: string = 'json'): JQuery.jqXHR {
        return $.post(url, data, (d) => {
            return d;
        }, dataType);
    }

    public static put(url: string, data: object = {}, contentType: string = 'application/json; charset=UTF-8'): JQuery.jqXHR {
        return $.ajax({
            type: 'put',
            url: url,
            data: data,
            contentType: contentType
        });
    }

    public static patch(url: string, data: object = {}, contentType: string = 'application/json; charset=UTF-8'): jqXHR {
        return $.ajax({
            type: 'patch',
            url: url,
            data: data,
            contentType: contentType
        });
    }

    public static delete(url: string, data: object = {}, contentType: string = 'application/json; charset=UTF-8'): jqXHR {
        return $.ajax({
            type: 'delete',
            url: url + '?' + $.param(data),
            contentType: contentType
        });
    }

}

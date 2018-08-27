// https://github.com/meshakeeb/StoreJS
//
// // Store 'Shakeeb' at 'username'
// store.set('username', 'Shakeeb')
//
// // Get 'username'
// store.get('username')
//
// // Remove 'username'
// store.remove('username')
//
// // Store an object literal - store.js uses JSON.stringify under the hood
// store.set('user', { name: 'Shakeeb', likes: 'javascript' })
//
// // Get the stored object - store.js uses JSON.parse under the hood
// var user = store.get('user')
// alert(user.name + ' likes ' + user.likes)
//
// // Store with expiration
// store.set('username', 'Shakeeb', { expires: '10s' } ); // expires in 10 seconds
// store.set('username', 'Shakeeb', { expires: '10m' } ); // expires in 10 minutes
// store.set('username', 'Shakeeb', { expires: '10h' } ); // expires in 10 hours
// store.set('username', 'Shakeeb', { expires: '10d' } ); // expires in 10 days
//
// /// Use localStorage Directly
// store.local('username', 'Shakeeb', { expires: '10s' } ); // store 'username' to localStorgae and make it expires in 10 seconds
// store.local('username'); // get 'username' from localStorgae
//
// /// Use Cookie Directly
// store.cookie('username', 'Shakeeb', { expires: '10s' } ); // store 'username' to Cookie and make it expires in 10 seconds
// store.cookie('username'); // get 'username' from Cookie

import * as $ from 'jquery';

export class StoreOptions {
    expires?: string;
    path?: string;
    domain?: string;
    secure?: boolean;
}

export default class Store {

    static local(key: string, value?: string, options?: StoreOptions): any {
        if (!key) {
            return false;
        }

        // Write
        if (arguments.length > 1) {
            let content = {
                value: value,
                expires: Store.expiry(typeof options !== 'undefined' ? options.expires : null)
            };
            localStorage.setItem(key, JSON.stringify(content));
            return true;
        }
        // Read
        let item = localStorage.getItem(key);
        if (!item) {
            return false;
        }
        let parsedItem = JSON.parse(item);
        if (parsedItem.expires && Date.now() > parsedItem.expires) {
            localStorage.removeItem(key);
            return false;
        }

        return parsedItem.value;
    }

    static cookie(key: string, value?: string, options?: StoreOptions) {
        if (!key) {
            return false;
        }
        // Write
        if (arguments.length > 1) {
            options = $.extend({}, {
                path: '/',
                expires: '30d'
            }, options);
            options.expires = Store.expiry(options.expires).toString();
            let date = new Date();
            date.setTime(parseInt(options.expires));
            if ('object' === typeof value) {
                value = JSON.stringify(value);
            }

            return ( document.cookie = [
                encodeURIComponent(key) + '=' + encodeURIComponent(value),
                options.expires ? '; expires=' + date.toUTCString() : '', // Use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join('') );
        }
        // Read
        let cookies = document.cookie ? document.cookie.split('; ') : [],
            rdecode = /(%[0-9A-Z]{2})+/g,
            i = 0,
            result: any = false;

        for (; i < cookies.length; i++) {

            let parts = cookies[i].split('='),
                name = parts[0].replace(rdecode, decodeURIComponent),
                cookie = parts.slice(1).join('=');

            if (key === name) {
                if ('"' === cookie.charAt(0)) {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    cookie = cookie.replace(rdecode, decodeURIComponent);
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) {
                    }
                } catch (e) {
                }
                result = cookie;
                break;
            }
        }

        return result;
    }

    static is_localstorage(): boolean {
        // return 'undefined' !== typeof localStorage;

        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('feature_test', 'yes');
                if (localStorage.getItem('feature_test') === 'yes') {
                    localStorage.removeItem('feature_test');
                    return true;
                } else {
                    // localStorage is disabled
                    return false;
                }
            } catch (e) {
                // localStorage is disabled
                return false;
            }
        } else {
            // localStorage is not available
            return false;
        }
    }

    static expiry(val): any {
        if (!val) {
            return false;
        }
        if (-1 === val) {
            let d = new Date();
            d.setFullYear(1970);
            return d.getTime();
        }
        let interval = parseInt(val),
            unit = val.replace(interval, '');
        if ('d' === unit) {
            interval = interval * 24 * 60 * 60 * 1000;
        }
        if ('h' === unit) {
            interval = interval * 60 * 60 * 1000;
        }
        if ('m' === unit) {
            interval = interval * 60 * 1000;
        }
        if ('s' === unit) {
            interval = interval * 1000;
        }

        return Date.now() + interval;
    }

    static set(key: string, value: string, options?: StoreOptions) {

        if (Store.is_localstorage()) {
            return Store.local(key, value, options);
        } else {
            return Store.cookie(key, value, options);
        }
    }

    static get(key: string) {

        if (Store.is_localstorage()) {
            return Store.local(key);
        } else {
            return Store.cookie(key);
        }
    }

    static remove(key: string): boolean {
        if (!key) {
            return false;
        }
        if (Store.is_localstorage()) {
            localStorage.removeItem(key);
        } else {
            Store.cookie(key, '', {expires: '-1'});
        }

        return true;
    }

}
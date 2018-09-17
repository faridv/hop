import * as $ from 'jquery';
import hotkeys from 'hotkeys-js';

declare let KeyEvent;

export default class Inputs {

    private static _instance: Inputs;
    private events;

    constructor() {
        this.events = {};
        // if (typeof KeyEvent === 'undefined') {
        //     KeyEvent = {};
        // }
    }

    public resolveKey(key: string): any {
        const requestedKey = key.toUpperCase();
        let resolvedKey = null;
        switch (requestedKey) {
            case 'LEFT':
                resolvedKey = KeyEvent.VK_LEFT || 37;
                break;
            case 'SPACE':
                resolvedKey = 32;
                break;
            case 'UP':
                resolvedKey = KeyEvent.VK_UP || 38;
                break;
            case 'RIGHT':
                resolvedKey = KeyEvent.VK_RIGHT || 39;
                break;
            case 'DOWN':
                resolvedKey = KeyEvent.VK_DOWN || 40;
                break;
            //
            case 'ENTER':
                resolvedKey = KeyEvent.VK_ENTER || 13;
                break;
            //
            case 'RED':
                resolvedKey = 82;
                // resolvedKey = KeyEvent.VK_RED || 116;
                break;
            case 'GREEN':
                resolvedKey = 71;
                // resolvedKey = KeyEvent.VK_GREEN || 117;
                break;
            case 'YELLOW':
                resolvedKey = 89;
                // resolvedKey = KeyEvent.VK_YELLOW || 118;
                break;
            case 'BLUE':
                resolvedKey = 66;
                // resolvedKey = KeyEvent.VK_BLUE || 119;
                break;
            //
            case 'PLAY':
                resolvedKey = KeyEvent.VK_PLAY || 415;
                break;
            case 'PAUSE':
                resolvedKey = KeyEvent.VK_PAUSE || 19;
                break;
            case 'STOP':
                resolvedKey = KeyEvent.VK_STOP || 413;
                break;
            case 'FAST_FWD':
                resolvedKey = KeyEvent.VK_FAST_FWD || 417;
                break;
            case 'REWIND':
                resolvedKey = KeyEvent.VK_REWIND || 412;
                break;
            case 'BACK':
                resolvedKey = KeyEvent.VK_BACK || 461;
                break;
            //
            case '0':
                resolvedKey = KeyEvent.VK_0 || 48;
                break;
            case '1':
                resolvedKey = KeyEvent.VK_1 || 49;
                break;
            case '2':
                resolvedKey = KeyEvent.VK_2 || 50;
                break;
            case '3':
                resolvedKey = KeyEvent.VK_3 || 51;
                break;
            case '4':
                resolvedKey = KeyEvent.VK_4 || 52;
                break;
            case '5':
                resolvedKey = KeyEvent.VK_5 || 53;
                break;
            case '6':
                resolvedKey = KeyEvent.VK_6 || 54;
                break;
            case '7':
                resolvedKey = KeyEvent.VK_7 || 55;
                break;
            case '8':
                resolvedKey = KeyEvent.VK_8 || 56;
                break;
            case '9':
                resolvedKey = KeyEvent.VK_9 || 57;
                break;
        }

        return resolvedKey;
    }

    public addEvent(key: string, once: boolean = false, params: any = {}, handler: any): void {
        const scope = typeof params.key !== 'undefined' ? params.key.split('.')[0] : 'default';
        const eventData = $.extend({}, params, {eventKey: key, once: once, handler: typeof handler === 'function'});
        this.on(key, handler, scope, once, eventData);

    }

    private on(key: string, handler: any, scope: string = 'default', reset: boolean = false, eventData: any): void {
        const self = this;
        this.registerEvent(eventData);
        // hotkeys(this.resolveKey(key), (e) => {
        hotkeys(key, (e) => {
            if (typeof handler !== 'undefined')
                handler();
            if (reset) {
                // self.off(this.resolveKey(key), scope)
                self.off(key, eventData);
            }
        });
    }

    private off(key, eventData): void {
        hotkeys.unbind(key);
        this.purgeEvent(key, eventData);
    }

    public getEventList(onlyButtons: boolean = false) {
        let results = this.events;
        if (onlyButtons) {
            let resultsWithButton = [];
            for (let i: number = 0; i < results.length; i++) {
                if (results[i]['button']) {
                    resultsWithButton.push(results[i]);
                }
            }
            return resultsWithButton;
        }
        return results;
    }

    private registerEvent(params): void {
        if (!this.events[0]) {
            this.events = [];
        }
        this.events.push(params);
        $('body').trigger('event-change', params);
    }

    private purgeEvent(key, eventData): void {
        const eventsList = this.events;
        for (let i: number = 0; i < eventsList.length; i++) {
            if (eventsList[i]['key'] === key) {
                delete eventsList[i];
                $('body').trigger('event-change', eventData);
            }
        }
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
import * as $ from 'jquery';
// import hotkeys from 'hotkeys-js';
import * as hotkeys from '../_helpers/hotkeys.js';

declare let KeyEvent;

export default class Inputs {

    private static _instance: Inputs;
    private events;
    public hbbtvKeyEvents = [
        {key: 'enter', value: KeyEvent.VK_ENTER || 13},
        {key: 'return', value: KeyEvent.VK_ENTER || 13},
        {key: 'left', value: KeyEvent.VK_LEFT || 37},
        {key: 'up', value: KeyEvent.VK_UP || 38},
        {key: 'right', value: KeyEvent.VK_RIGHT || 39},
        {key: 'down', value: KeyEvent.VK_DOWN || 40},
        {key: 'red', value: KeyEvent.VK_RED || 116},
        {key: 'green', value: KeyEvent.VK_GREEN || 117},
        {key: 'yellow', value: KeyEvent.VK_YELLOW || 118},
        {key: 'blue', value: KeyEvent.VK_BLUE || 119},
        {key: 'play', value: KeyEvent.VK_PLAY || 415},
        {key: 'pause', value: KeyEvent.VK_PAUSE || 19},
        {key: 'stop', value: KeyEvent.VK_STOP || 413},
        {key: 'fast_fwd', value: KeyEvent.VK_FAST_FWD || 417},
        {key: 'rewind', value: KeyEvent.VK_REWIND || 412},
        {key: 'back', value: KeyEvent.VK_BACK || 461}
    ];

    constructor() {
        this.events = {};
        // this.extendKeyMap(this.hbbtvKeyEvents);
    }

    // private extendKeyMap(keys) {
    //     hotkeys.extendMap(keys);
    // }

    public addEvent(key: string, once: boolean = false, params: any = {}, handler: any): void {
        const scope = typeof params.key !== 'undefined' ? params.key.split('.')[0] : 'default';
        const eventData = $.extend({}, params, {eventKey: key, once: once, handler: typeof handler === 'function'});
        this.on(key, handler, scope, once, eventData);
    }

    private on(key: string, handler: any, scope: string = 'default', reset: boolean = false, eventData: any): void {
        const self = this;
        this.registerEvent(eventData);
        hotkeys(key, (e) => {
            if (typeof handler !== 'undefined')
                handler(e);
            if (reset) {
                self.off(key, eventData);
            }
        });
    }

    public removeEvent(key, eventData = {}): void {
        this.off(key, eventData);
    }

    private off(key, eventData = {}): void {
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
        for (let i: number = 0; i < this.events.length; i++) {
            if (this.events[i]['eventKey'] === key) {
                delete this.events[i];
            }
        }
        // Clean up empty slots of events list
        this.events = this.events.filter(Boolean);
        $('body').trigger('event-change', eventData);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
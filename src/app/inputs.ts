import * as $ from 'jquery';
import * as hotkeys from '../_helpers/hotkeys.js';

export default class Inputs {

    private static _instance: Inputs;
    private events: any;

    constructor() {
        this.events = {};
    }

    public addEvent(key: string, once: boolean = false, params: any = {}, handler: any): void {
        const scope = typeof params.key !== 'undefined' ? params.key.split('.')[0] : 'default';
        const eventData = $.extend({}, params, {eventKey: key, once: once, handler: typeof handler === 'function'});
        
        this.on(key, handler, scope, once, eventData);
    }

    private on(key: string, handler: any, scope: string = 'default', reset: boolean = false, eventData: any): void {
        const self = this;
        this.registerEvent(eventData);
        hotkeys(key, (e) => {
            alert(key);

            e.preventDefault();
            if (typeof handler !== 'undefined') {
                handler(e);
            }
            if (reset) {
                self.off(key, eventData);
            }
        });
    }

    public removeEvent(key, eventData = {}): void {
        this.off(key, eventData);
    }

    private off(key, eventData = {}): void {
        if (this.checkKeyRegistration(key)) {
            hotkeys.unbind(key);
            this.purgeEvent(key, eventData);
        }
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

    private checkKeyRegistration(key): boolean {
        for (let i: number = 0; i < this.events.length; i++) {
            if (this.events[i]['eventKey'] === key) {
                return true;
            }
        }
        return false;
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
import * as $ from 'jquery';

export default class LogHelper {

    // private static _instance: LogHelper;
    private config: any;

    constructor(config) {
        if (typeof config !== 'undefined') {
            this.config = config;
        }
    }

    public info(message: string, device: string = '*'): void {
        if (device === '*' || this.checkAgent(device)) {
            this.send('info: ' + message);
        }
    }

    public error(message: string, device: string = '*'): void {
        if (device === '*' || this.checkAgent(device)) {
            this.send('error: ' + message);
        }
    }

    private checkAgent(needle: string): boolean {
        return navigator.userAgent.search(new RegExp(needle, "i")) === -1;
    }

    private send(message: string): void {
        const endpoint = this.config.api.services.log;
        if (typeof this.config.log !== 'undefined' && this.config.log) {
            $.get(endpoint + '?msg=' + encodeURI(message));
        }
    }
    //
    // public static get instance() {
    //     return this._instance || (this._instance = new this());
    // }

}
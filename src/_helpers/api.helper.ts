import {ConfigHelper} from "./config.helper";

export class ApiHelper {

    static get(service: string = '', postfix: string = ''): string {
        const api = ConfigHelper.get('api');
        if (service !== '' && typeof api.services[service] !== 'undefined') {
            return this.root() + api.services[service] + (postfix ? '/' + postfix : '');
        }
        return '';
    }

    static root(): string {
        return ConfigHelper.get('api').url;
    }
}
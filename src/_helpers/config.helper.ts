import Store from "../_utilities/storage.utility";

export class ConfigHelper {

    public static get(field: string = '', fallbackValue: any = null): any {
        const config = Store.get('config');
        if (field === '') {
            return config;
        }
        if (typeof config[field] !== 'undefined') {
            return config[field];
        } else {
            if (typeof fallbackValue !== 'undefined' && fallbackValue) {
                return fallbackValue;
            }
        }
        return config;
    }
}
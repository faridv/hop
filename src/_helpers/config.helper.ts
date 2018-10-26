import Store from "../_utilities/storage.utility";

export class ConfigHelper {

    public static get(field: string = ''): any {
        const config = Store.get('config');
        return field ? config[field] : config;
    }
}
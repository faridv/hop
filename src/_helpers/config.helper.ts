import Store from "../_utilities/storage.utility";
import { IConfig } from '../_models/config.model';

export class ConfigHelper {

    public static defaultConfig: IConfig = {
        // version: "0.0.0",
        title: "HOP: HbbTV Open Platform",
        container: "#app",
        locale: "fa",
        timezone: "Asia/Tehran",
        delay: 500,
        timeout: 120000,
        transitionSpeed: 0,
        clockUpdateInterval: 600000,
        theme: "default",
        mediaPlayer: "videojs",
        hd: true,
        resolution: "720",
        verbose: false,
        log: false,
        autoStart: false,
        streamMode: false,
        streamUrl: "",
        exitMethod: "hide",
        api: {},
        applications: [],
        locations: [],
    };

    public static prepare(config): IConfig {
        return { ...ConfigHelper.defaultConfig, ...config };
    }

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

import Store from "../_utilities/storage.utility";

interface IConfig {
    // version: string;
    title: string;
    container: string;
    locale: string;
    timezone: string;
    delay: number;
    timeout: number;
    transitionSpeed: number;
    clockUpdateInterval: number;
    theme: string;
    mediaPlayer: string;
    hd: boolean;
    resolution: string;
    verbose: boolean;
    log: boolean;
    autoStart: boolean;
    streamMode: boolean;
    streamUrl: string;
    exitMethod: string;
    api: object;
    applications: {}[];
}

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
        applications: []
    };

    public static prepare(config): IConfig {
        return {...ConfigHelper.defaultConfig, ...config};
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
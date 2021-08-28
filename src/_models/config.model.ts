export interface IConfig {
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
    api: IApi;
    applications: IApplication[];
    locations: ILocation[];
}

export interface IApplication {
    button: IButton;
    hasHub: boolean;
    clock: boolean;
    connectionStatus: boolean;
    theme: string;
    layout: string;
    modules: IModule[];
}

export interface IModule {
    title: string;
    type: string;
    icons: string;
}

export interface IButton {
    key: string;
    image: string;
    position: string;
}

export interface ILocation {
    city: string;
    title: string;
    coords: number[];
}

export interface IApi {
    url?: string;
    services?: { [key: string]: string }[];
    pusher?: string;
}

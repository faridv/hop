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
    api: object;
    applications: {}[];
}

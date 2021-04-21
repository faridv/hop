import { VideoJsPlayerOptions } from 'video.js';

export interface VideoJsOptions extends VideoJsPlayerOptions {
    unloadMethod?: () => void;
}

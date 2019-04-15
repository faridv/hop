import {ConfigHelper} from './config.helper';
import {ScriptLoaderService} from '../_services/script-loader.service';

export class PlayerHelper {

    // public static _instance: PlayerHelper;
    private scriptLoader;
    private scripts = [
        "assets/js/vendor/video.min.js"
    ];
    private id: string;
    private type: string;
    private options: any;
    private container: string;
    private instance: any;
    private defaultOptions = {
        autoplay: true
    };

    constructor(id: string, container: string, options: any, type: string = 'videojs') {
        this.scriptLoader = ScriptLoaderService.instance;
        this.type = type;
        this.id = id;
        this.options = $.extend(true, {}, this.defaultOptions, options);
        this.container = container;
        this.init();
    }

    private init() {
        const self = this;

        if (typeof videojs === 'undefined') {
            this.scripts.forEach((script) => {
                self.scriptLoader.loadScript('head', script, true).then(() => {
                    self.render();
                });
            });
        }
    }

    public getInstance() {
        return this.instance;
    }

    public render() {
        const self = this;
        $('#' + self.container).on('loadedmetadata', () => {
            if (self.type === 'videojs') {
                if (videojs(self.container).isPaused)
                    videojs(self.container).play();
            } else {
                if (document.getElementById(self.container).isPaused)
                    document.getElementById(self.container).play();
            }
        });

        if (this.type === 'videojs') {
            this.instance = videojs(this.container, this.options);
        }
    }

    public unload() {

    }

    public handleBroadcastAudio(mute: boolean = true) {
        const $tv = <any> document.getElementById('broadcastvideo');
        if (mute) {
            try {
                $tv.stop();
            } catch (e) {
                // cannot stop tv stream, let's try to mute it
                try {
                    $tv.muted = true;
                } catch (e) {
                    // ignore
                }
            }
        } else {
            try {
                $tv.bindToCurrentChannel();
            } catch (e) {
                // ignore
            }
            try {
                $tv.muted = false;
                $tv.release();
            } catch (e) {
                // ignore
            }
        }
    }

    public play() {
        const instance = this.getInstance();
        this.setPlaybackSpeed(1);
        instance.play();
        instance.userActive(false);
    }

    public pause() {
        const instance = this.getInstance();
        instance.pause();
        instance.userActive(true);
    }

    public stop() {
        this.handleBroadcastAudio(false);
    }

    public ffw() {
        this.setPlaybackSpeed(2);
    }

    public frw() {

    }

    private setPlaybackSpeed(rate = 2) {
        const instance = this.getInstance();
        instance.playbackRate(rate);
    }

    // public static get instance() {
    //     const playerType = ConfigHelper.get('mediaPlayer', 'videojs');
    //     return this._instance || (this._instance = new this(playerType));
    // }
}
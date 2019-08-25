import {ScriptLoaderService} from '../_services/script-loader.service';
import TemplateHelper from './template.helper';
import Inputs from '../app/inputs';

declare var videojs: any;

export class PlayerService {

    private scriptLoader;
    private scripts = [
        "assets/js/vendor/video.min.js"
    ];
    private input;
    private template;
    private type: string;
    private options: any;
    private container: string;
    private instance: any;
    private playerId: string = 'vod-player';
    private events = {
        'player.play': {key: 'player.play', title: 'ادامه پخش', icon: 'play', button: true},
        'player.pause': {key: 'player.pause', title: 'توقف', icon: 'pause', button: true},
        'player.ffw': {key: 'player.ffw', title: 'جلو', icon: 'forward', button: true},
        'player.rewind': {key: 'player.ffw', title: 'جلو', icon: 'forward', button: true},
        'player.stop': {key: 'player.stop', title: 'بازگشت', icon: 'stop', button: true},
    };
    private defaultOptions = {
        autoplay: true,
        controls: true,
        controlBar: {
            children: [
                'playToggle',
                'currentTimeDisplay',
                'progressControl',
                'remainingTimeDisplay'
            ]
        }
    };
    public status: string = 'inactive';

    constructor(container: string, options: any, type: string = 'videojs') {
        this.scriptLoader = ScriptLoaderService.instance;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.type = type;

        this.options = $.extend(true, {}, this.defaultOptions, options);
        this.container = container;
        this.init();
    }

    // load the player script if it's not loaded yet and call render()
    private init() {
        const self = this;
        if (typeof videojs === 'undefined') {
            this.scripts.forEach((script) => {
                self.scriptLoader.loadScript('head', script, true).then(() => {
                    self.prepareRender();
                });
            });
        } else {
            self.prepareRender();
        }
    }

    private prepareRender() {
        this.status = 'rendering';
        if (this.elementExists()) {
            this.render();
        } else {
            this.createElement(() => {
                this.render();
            });
        }
    }

    private elementExists() {
        return $('#' + this.playerId).length;
    }

    public getInstance() {
        return this.instance;
    }

    public createElement(callback) {
        $('#' + this.container).html('<video id="' + this.playerId + '" class="video-js" preload="auto" autoplay width="1280" height="720"></video>');
        this.instance = <HTMLVideoElement>document.getElementById(this.playerId);
        callback();
    }

    public render() {
        const self = this;
        this.template.loading();
        this.status = 'loading';
        $('#' + this.playerId).on('loadedmetadata', () => {
            this.status = 'preparing';
            self.template.loading(false);
            self.play(true);
            self.template.addClass('player-mode');
            self.disableBroadcast();
        });
        self.instance = videojs(this.playerId, this.options);
        this.registerEventsListeners();
    }

    public unload() {
        this.input.removeEvent('p,pause', this.events['player.pause']);
        this.input.removeEvent('f,fast_fwd', this.events['player.ffw'])
        this.input.removeEvent('d,rewind', this.events['player.rewind']);
        this.input.removeEvent('p,play', this.events['player.play']);
        this.input.removeEvent('s,stop', this.events['player.stop']);
        if (this.type === 'videojs') {
            videojs(document.getElementById(this.playerId)).dispose();
        }
        $('#' + this.container).empty();
        this.status = 'inactive';
        this.template.removeClass('player-mode');
        this.reInitBroadcast();
        return;
        if (typeof this.options.unloadMethod === 'function') {
            setTimeout(() => {
                console.log('calling parent unload()');
                this.options.unloadMethod();
            }, 200);
        }
    }

    public reInitBroadcast() {
        const $tv = this.getBroadcastVideo();
        try {
            $tv.muted = false;
        } catch (e) {
            try {
                $tv.play();
            } catch (e) {
                // ignore
                console.log('cannot start tv', e);
                try {
                    $tv.bindToCurrentChannel();
                } catch (e) {
                    // ignore
                }
            }
        }
    }

    protected getBroadcastVideo() {
        const $tv = <any> $('#broadcastvideo');
        const $broadcastVideo = ($tv.find('video').length) ? $tv.find('video:first')[0] : $tv[0];
        return $broadcastVideo;
    }

    public disableBroadcast() {
        const $tv = this.getBroadcastVideo();
        try {
            $tv.muted = true;
        } catch (e) {
            console.error('cannot mute', e);
            // cannot mute tv stream, let's try to stop it
            try {
                $tv.stop();
            } catch (e) {
                console.error('cannot stop', e);
                try {
                    $tv.release();
                } catch (e) {
                    console.error('cannot release', e);
                }
            }
        }
    }

    // control functions
    public play(initial: boolean = false) {
        const self = this;
        this.setPlaybackSpeed(1);
        this.status = 'playing';
        if (initial) {
            if (videojs(this.playerId).isPaused)
                self.play();
            else {
                if (self.instance.paused)
                    self.instance.play();
            }
        } else {
            if (self.type === 'videojs') {
                videojs(this.playerId).play();
            } else {
                self.instance.play();
            }
        }

        this.instance.userActive(false);

        setTimeout(() => {
            self.input.removeEvent('p,play', self.events['player.play']);
            self.input.addEvent('p,pause', false, self.events['player.pause'], () => {
                self.pause();
            });
        }, 200);
    }

    public pause() {
        const self = this;
        if (self.type === 'videojs') {
            videojs(this.playerId).pause();
        } else {
            self.instance.pause();
        }
        this.status = 'paused';
        this.instance.userActive(true);

        setTimeout(() => {
            self.input.removeEvent('p,pause', self.events['player.pause']);
            // const playParams = {key: 'player.play', title: 'ادامه پخش', icon: 'play', button: true};
            self.input.addEvent('p,play', false, self.events['player.play'], () => {
                self.play();
            });
        }, 200);
    }

    public stop() {
        this.status = 'deactivating';
        this.unload();
    }

    public ffw() {
        const self = this;
        setTimeout(() => {
            self.input.removeEvent('p,play', self.events['player.play']);
            self.input.removeEvent('p,pause', self.events['player.pause']);
            // self.input.removeEvent('p,play', {key: 'player.play'});
            // self.input.removeEvent('p,pause', {key: 'player.pause'});
            const playParams = {key: 'player.play', title: 'ادامه پخش', icon: 'play', button: true};
            self.input.addEvent('p,play', false, self.events['player.play'], () => {
                self.play();
            });
        }, 200);
        this.status = 'ffw';
        this.instance.userActive(true);
        this.setPlaybackSpeed(3);
    }

    public rewind() {
        const self = this;
        const player = videojs(this.playerId);
        this.instance.userActive(true);
        const rewindInterval = setInterval(() => {
            let currentTime = player.currentTime();
            if (currentTime <= 3) {
                player.currentTime(0);
                player.pause();
                clearInterval(rewindInterval);
            }
            try {
                player.currentTime(currentTime - 1);
            } catch (e) {

            }
        }, 333);
        setTimeout(() => {
            // self.input.removeEvent('p,pause', {key: 'player.pause'});
            self.input.removeEvent('p,pause', self.events['player.pause']);
            const playParams = {key: 'player.play', title: 'ادامه پخش', icon: self.events['player.play'], button: true};
            self.input.addEvent('p,play', false, playParams, () => {
                clearInterval(rewindInterval);
                self.play();
            });
        }, 200);
    }

    private setPlaybackSpeed(rate = 1) {
        videojs(this.playerId).playbackRate(rate);
    }

    public registerEventsListeners() {
        const self = this;
        this.input.addEvent('s,stop', false, this.events['player.stop'], () => {
            self.stop();
        });
        this.input.addEvent('f,fast_fwd', false, this.events['player.ffw'], () => {
            self.ffw();
        });
        this.input.addEvent('d,rewind', false, this.events['player.rewind'], () => {
            self.rewind();
        });
    }
}
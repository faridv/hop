import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import Layouts from '../../app/layouts';
import {ProgramService} from './program.service';
import {Program, ProgramEpisode} from './program.model';
import {ScriptLoaderService} from '../../_services/script-loader.service';

export default class ProgramModule {

    private service;
    private input;
    private template;
    private config;
    private data;
    private layoutInstance: Layouts;
    private $el = $('#content');

    private scriptLoader;
    private scripts = [
        "assets/js/vendor/video.min.js"
    ];

    constructor(config?, layoutInstance?) {

        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = ProgramService.instance;
        this.config = config;
        this.layoutInstance = layoutInstance;
        this.scriptLoader = ScriptLoaderService.instance;

        this.load();

        return this;
    }

    load(callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getLatest().done((data: Program[]) => {
            // End loading
            self.data = data;
            self.template.loading(false);
            self.render(data, (data: Program[]) => {
                self.initializeSlider();
            });
        });
    }

    initializeSlider(): void {
        const self = this;
        const $el = $("ul.program-items");
        const slidesToShow = 3;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.slick({
            rtl: $("body").hasClass('rtl'),
            accessibility: false,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            speed: self.config.transitionSpeed,
            useCSS: false,
            useTransform: false
        });
        this.registerKeyboardInputs($el);
    }

    render(data: Program[], callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'program');
        this.template.render(templatePromise, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: ProgramModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('right', {key: 'program.right'});
        self.input.removeEvent('left', {key: 'program.left'});
        self.input.removeEvent('enter', {key: 'program.right'});
        self.input.removeEvent('up', {key: 'program.up'});
        self.input.removeEvent('down', {key: 'program.down'});
        self.input.removeEvent('p,play', {key: 'program.play'});
        return true;
    }

    registerKeyboardInputs($carousel): void {
        const self = this;

        const rightParams = {key: 'program.right', title: 'برنامه بعدی', icon: 'right', button: true};
        this.input.addEvent('right', false, rightParams, () => {
            // Next News
            $carousel.slick('slickPrev');
        });

        const leftParams = {key: 'program.left', title: 'برنامه قبلی', icon: 'left', button: true};
        this.input.addEvent('left', false, leftParams, () => {
            // Prev News
            $carousel.slick('slickNext');
        });

        const enterParams = {key: 'program.enter', title: 'نمایش قسمت‌ها', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            self.showEpisodes($carousel);
        });
        $(document).on('click', "ul.program-items li", (e) => {
            self.showEpisodes($carousel, $(this));
        });
    }

    showEpisodes($carousel, $item?): void {
        let id: number;
        let item: Program;

        if (typeof $item !== 'undefined' && typeof $item.attr('data-id') !== 'undefined' && $item.attr('data-id')) {
            id = ~~$item.attr('data-id')
        } else {
            id = ~~$carousel.find('.slick-current.slick-center li').attr('data-id');
        }
        if (id > 0) {
            this.data.forEach((program) => {
                if (program.Id === id) {
                    item = program;
                }
            });
            this.loadEpisodes(id, item);
        }
    }

    loadEpisodes(programId: number, currentProgram: Program) {
        const self = this;

        self.input.removeEvent('up', {key: 'program.up'});
        self.input.removeEvent('down', {key: 'program.down'});
        self.input.removeEvent('p,play', {key: 'program.play'});

        this.template.loading();
        this.service.getEpisodes(programId).done((data: ProgramEpisode[]) => {
            // End loading
            self.template.loading(false);
            const episodeData = {
                items: data,
                program: currentProgram
            };
            self.renderEpisodes(episodeData, (data: ProgramEpisode[]) => {
                self.initializeEpisodesSlider();

                self.input.removeEvent('left', {key: 'program.left'});
                self.input.removeEvent('right', {key: 'program.right'});
                self.input.removeEvent('enter', {key: 'program.enter'});
            });
        });
    }

    renderEpisodes(data, callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'program-episodes');
        this.template.render(templatePromise, {items: data}, $('#program-episodes'), 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    initializeEpisodesSlider(): void {
        const self = this;
        const $el = $("ul.episode-items");
        const slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('afterChange', () => {
            self.input.removeEvent('p,play', {key: 'program.play'});
            setTimeout(() => {
                const enterParams = {key: 'program.play', title: 'پخش ویدیو', icon: 'play', button: true};
                self.input.addEvent('p,play', false, enterParams, () => {
                    self.playVideo($el);
                });
            }, 100);
        });
        $el.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            lazyLoad: 'ondemand',
        });
        this.registerEpisodesKeyboardInputs($el);
    }

    registerEpisodesKeyboardInputs($carousel): void {
        const self = this;

        this.input.removeEvent('back,backspace', {key: 'module.exit'});
        const exitParams = {key: 'program.back', title: 'بازگشت به برنامه‌ها', icon: 'refresh', button: true};
        this.input.addEvent('back,backspace', false, exitParams, () => {
            self.unloadEpisodes();
        });

        const downParams = {key: 'program.down', title: 'قسمت بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            // Next News
            $carousel.slick('slickNext');
        });

        const upParams = {key: 'program.up', title: 'قسمت قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            // Prev News
            $carousel.slick('slickPrev');
        });

        const enterParams = {key: 'program.play', title: 'پخش ویدیو', icon: 'play', button: true};
        self.input.addEvent('p,play', false, enterParams, () => {
            self.playVideo($carousel);
        });

        // $(document).on('click', "ul.news-items li", (e) => {
        //     self.showEpisodes($carousel, $(this));
        // });
    }

    registerPlayerKeyboardInputs(): void {
        const self = this;
        this.input.removeEvent('p,play', {key: 'program.play'});
        this.input.removeEvent('up', {key: 'program.up'});
        this.input.removeEvent('down', {key: 'program.down'});
        this.input.removeEvent('back,backspace', {key: 'program.back'});

        const pauseParams = {key: 'program.pause', title: 'متوقف', icon: 'pause', button: true};
        self.input.addEvent('p,pause', false, pauseParams, () => {
            self.pausePlayer();
        });

        const stopParams = {key: 'program.stop', title: 'بازگشت', icon: 'stop', button: true};
        self.input.addEvent('s,stop', false, stopParams, () => {
            self.unloadVideoPlayer();
        });
    }

    getMediaUrl($carousel): string {
        const $current = $carousel.find('.slick-current.slick-center li');
        const mediaUrl = $current.find('img:first').attr('src').replace('.jpg', '_whq.mp4');
        return mediaUrl;
    }

    unloadEpisodes() {
        const self = this;

        $('#program-episodes').empty();

        this.input.removeEvent('up', {key: 'program.up'});
        this.input.removeEvent('down', {key: 'program.down'});
        this.input.removeEvent('p,play', {key: 'program.play'});
        this.input.removeEvent('back,backspace', {key: 'program.back'});

        this.registerKeyboardInputs($("ul.program-items"));
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

    pausePlayer(): void {
        const self = this;
        const $player = videojs('episode-player');
        $player.pause();
        setTimeout(() => {
            this.input.removeEvent('p,pause', {key: 'program.pause'});
            const playParams = {key: 'program.play', title: 'ادامه پخش', icon: 'play', button: true};
            this.input.addEvent('p,play', false, playParams, () => {
                self.playPlayer();
            });
        }, 200);
    }

    playPlayer(): void {
        const self = this;
        const $player = videojs('episode-player');
        $player.play();
        setTimeout(() => {
            this.input.removeEvent('p,play', {key: 'program.play'});
            const pauseParams = {key: 'program.pause', title: 'متوقف', icon: 'pause', button: true};
            this.input.addEvent('p,pause', false, pauseParams, () => {
                self.pausePlayer();
            });
        }, 200);
    }

    playVideo($carousel): void {
        const self = this;
        if (this.template.hasClass('player-mode'))
            return;

        const mediaUrl = this.getMediaUrl($carousel);

        this.template.addClass('player-mode');
        this.handleStreamAudio();
        $('#mediaplayer').html('<video id="episode-player" class="video-js" preload="auto" autoplay width="1280" height="720"></video>');
        if (typeof videojs !== 'undefined') {
            self.initPlayer('episode-player', mediaUrl);
        } else {
            this.scripts.forEach((script) => {
                self.scriptLoader.loadScript('head', script, true).then(() => {
                    self.initPlayer('episode-player', mediaUrl);
                });
            });
        }
    }

    initPlayer(container: string, src: string): void {
        $('#' + container).on('loadedmetadata', () => {
            if (videojs(container).isPaused)
                videojs(container).play();
        });
        videojs(container, {
            autoplay: true,
            sources: [{
                src: src,
                type: 'video/mp4'
            }]
        });
        this.registerPlayerKeyboardInputs();
    }

    unloadVideoPlayer(): void {
        const self = this
        videojs(document.getElementById('episode-player')).dispose();
        $('#mediaplayer').empty();
        this.template.removeClass('player-mode');
        this.input.removeEvent('p,pause', {key: 'program.pause'});
        this.input.removeEvent('p,play', {key: 'program.play'});
        this.input.removeEvent('s,stop', {key: 'program.stop'});
        setTimeout(() => {
            self.registerEpisodesKeyboardInputs($("ul.episode-items"));
        }, 200);

    }

    handleStreamAudio(mute: boolean = true) {
        // const $tv = <HTMLVideoElement> $('#broadcast video:first')[0];
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
                $tv.muted = false;
                $tv.release();
            } catch (e) {
                // ignore
            }
        }

    }

}
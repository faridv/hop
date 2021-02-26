import {Program, ProgramEpisode} from './program.model';
import {ProgramService} from './program.service';
import {Module} from '../../libs';
import {DefaultResponse} from '../../_models';
import programTemplate from './program.template.html';
import episodeTemplate from './program-episodes.template.html';

export default class ProgramModule extends Module {

    private data;
    protected events = {
        'program.play': {'control': 'enter', title: 'پخش ویدیو', icon: 'enter'},
        'program.back': {'control': 'back,backspace', title: 'بازگشت به برنامه‌ها', icon: 'refresh'},
        'program.down': {'control': 'down', title: 'قسمت بعدی', icon: 'bottom'},
        'program.up': {'control': 'up', title: 'قسمت قبلی', icon: 'up'},
        'program.right': {'control': 'right', title: 'برنامه بعدی', icon: 'right'},
        'program.left': {'control': 'left', title: 'برنامه قبلی', icon: 'left'},
        'program.enter': {'control': 'enter', title: 'نمایش قسمت‌ها', icon: 'enter'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.service = ProgramService.instance;
        this.events = this.prepareControls();
        this.load();
        return this;
    }

    load(callback?: any) {
        const self = this;
        this.templateHelper.loading();
        this.service.getLatest().done((data: DefaultResponse) => {
            self.data = data.data;
            self.render(self.data, (data: Program[]) => {
                // End loading
                self.templateHelper.loading(false);
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
        this.templateHelper.render(programTemplate, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    registerKeyboardInputs($carousel): void {
        const self = this;
        this.input.addEvent('right', false, this.events['program.right'], () => {
            // Next News
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('left', false, this.events['program.left'], () => {
            // Prev News
            $carousel.slick('slickNext');
        });
        this.input.addEvent('enter', false, this.events['program.enter'], () => {
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
                if (program.id === id) {
                    item = program;
                }
            });
            this.loadEpisodes(id, item);
        }
    }

    loadEpisodes(programId: number, currentProgram: Program) {
        const self = this;

        self.removeEpisodeKeyboardEvents(() => {
            self.templateHelper.loading();
            self.service.getEpisodes(programId).done((data: DefaultResponse) => {
                const episodeData = {
                    items: data.data,
                    program: currentProgram
                };
                self.renderEpisodes(episodeData, (data: ProgramEpisode[]) => {
                    // End loading
                    self.templateHelper.loading(false);
                    self.removeProgramKeyboardEvents();
                    self.initializeEpisodesSlider();
                });
            });
        }, true);
    }

    removeProgramKeyboardEvents(callback?): void {
        this.input.removeEvent('enter', this.events['program.enter']);
        this.input.removeEvent('left', this.events['program.right']);
        this.input.removeEvent('right', this.events['program.left']);
        if (typeof callback === 'function')
            callback();
    }

    renderEpisodes(data, callback): void {
        this.templateHelper.render(episodeTemplate, {items: data}, $('#program-episodes'), 'html', function () {
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
            self.input.removeEvent('enter', self.events['program.play']);
            setTimeout(() => {
                self.input.addEvent('enter', false, self.events['program.play'], () => {
                    self.playVideo($el);
                });
            }, 500);
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

    registerEpisodesKeyboardInputs($carousel = $("ul.episode-items")): void {
        const self = this;
        this.input.removeEvent('back,backspace', {key: 'module.exit'});
        this.input.addEvent('back,backspace', false, this.events['program.back'], () => {
            self.unloadEpisodes();
        });
        this.input.addEvent('down', false, this.events['program.down'], () => {
            // Next Episode
            $carousel.slick('slickNext');
        });
        this.input.addEvent('up', false, this.events['program.up'], () => {
            // Prev Episode
            $carousel.slick('slickPrev');
        });
        setTimeout(() => {
            self.input.addEvent('enter', false, self.events['program.play'], () => {
                self.playVideo($carousel);
            });
        }, 200);
    }

    removeEpisodeKeyboardEvents(callback?, handleReturn: boolean = true): void {
        this.input.removeEvent('up', this.events['program.up']);
        this.input.removeEvent('down', this.events['program.down']);
        this.input.removeEvent('enter', this.events['program.play']);
        if (handleReturn)
            this.input.removeEvent('back,backspace', this.events['program.back']);
        if (typeof callback === 'function')
            callback();
    }

    getMediaUrl($carousel): string {
        const $current = $carousel.find('.slick-current.slick-center li');
        return $current.attr('data-media');
    }

    getPoster($carousel): string {
        const $current = $carousel.find('.slick-current.slick-center li');
        return $current.find('img:first').attr('src');
    }

    unloadEpisodes() {
        const self = this;
        $('#program-episodes').empty();
        this.removeEpisodeKeyboardEvents(() => {
            setTimeout(() => {
                self.registerKeyboardInputs($("ul.program-items"));
            }, 500)
        });
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 200);
    }

    playVideo($carousel): void {
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const self = this;
        const playerParams = {
            unloadMethod: () => {
                setTimeout(() => {
                    self.registerEpisodesKeyboardInputs();
                }, 200);
            },
            sources: [{
                src: self.getMediaUrl($carousel),
                poster: self.getPoster($carousel),
                type: 'video/mp4'
            }]
        };
        this.playerInstance = new this.playerService('mediaplayer', playerParams);
        this.removeEpisodeKeyboardEvents();
    }
}

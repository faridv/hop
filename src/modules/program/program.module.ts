import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import Layouts from '../../app/layouts';
import {ProgramService} from './program.service';
import {Program, ProgramEpisode} from './program.model';
import {PlayerService} from '../../_helpers/player.helper';

export default class ProgramModule {

    private service;
    private input;
    private template;
    private config;
    private data;
    private layoutInstance: Layouts;
    private $el = $('#content');
    private playerService;
    private playerInstance;

    constructor(config?, layoutInstance?) {

        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = ProgramService.instance;
        this.config = config;
        this.layoutInstance = layoutInstance;
        this.playerService = PlayerService;

        this.load();

        return this;
    }

    load(callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getLatest().done((data: any) => {
            // End loading
            self.data = data.data;
            self.template.loading(false);
            self.render(self.data, (data: Program[]) => {
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
        self.input.removeEvent('enter', {key: 'program.play'});
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
                if (program.id === id) {
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
        self.input.removeEvent('enter', {key: 'program.play'});

        this.template.loading();
        this.service.getEpisodes(programId).done((data: any) => {
            // End loading
            self.template.loading(false);
            const episodeData = {
                items: data.data,
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
            self.input.removeEvent('enter', {key: 'program.play'});
            setTimeout(() => {
                const enterParams = {key: 'program.play', title: 'پخش ویدیو', icon: 'enter', button: true};
                self.input.addEvent('enter', false, enterParams, () => {
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

        setTimeout(() => {
            const enterParams = {key: 'program.play', title: 'پخش ویدیو', icon: 'enter', button: true};
            self.input.addEvent('enter', false, enterParams, () => {
                self.playVideo($carousel);
            });
        }, 200);
    }

    removeProgramsKeyboardEvents(): void {
        const self = this;
        this.input.removeEvent('enter', {key: 'program.play'});
        this.input.removeEvent('up', {key: 'program.up'});
        this.input.removeEvent('down', {key: 'program.down'});
        this.input.removeEvent('back,backspace', {key: 'program.back'});
    }

    getMediaUrl($carousel): string {
        const $current = $carousel.find('.slick-current.slick-center li');
        return $current.attr('data-media');
        // return $current.find('img:first').attr('src').replace('.jpg', '_whq.mp4');
    }

    getPoster($carousel): string {
        const $current = $carousel.find('.slick-current.slick-center li');
        return $current.find('img:first').attr('src');
    }

    unloadEpisodes() {
        const self = this;

        $('#program-episodes').empty();

        this.input.removeEvent('up', {key: 'program.up'});
        this.input.removeEvent('down', {key: 'program.down'});
        this.input.removeEvent('enter', {key: 'program.play'});
        this.input.removeEvent('back,backspace', {key: 'program.back'});

        this.registerKeyboardInputs($("ul.program-items"));
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

    playVideo($carousel): void {
        if (this.template.hasClass('player-mode'))
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
        this.removeProgramsKeyboardEvents();
    }
}
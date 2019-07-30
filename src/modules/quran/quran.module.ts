import {QuranService} from './quran.service';
import {DefaultResponse} from '../../_models';
import {Surah, SurahList} from './quran.model';
import {Module} from '../../libs';

export default class QuranModule extends Module {

    private data: SurahList;
    private currentSurah: Surah;
    protected events = {
        'quran.prev': {control: 'up', key: 'quran.prev', title: 'سوره قبلی', icon: 'up', button: true},
        'quran.next': {control: 'down', key: 'quran.next', title: 'سوره بعدی', icon: 'bottom', button: true},
        'quran.enter': {control: 'enter', key: 'quran.enter', title: 'نمایش متن', icon: 'enter', button: true},
        'quran.toggle': {control: 'right', key: 'quran.toggle', title: 'نمایش ترجمه', icon: 'right', button: true},
        'quran.up': {control: 'up', key: 'quran.up', title: 'اسکرول بالا', icon: 'up', button: false},
        'quran.down': {control: 'down', key: 'quran.down', title: 'اسکرول پایین', icon: 'bottom', button: false},
        'quran.back': {control: 'back,backspace', key: 'quran.back', title: 'بازگشت به سوره‌ها', icon: 'refresh', button: true}
    };

    constructor(config?, layoutInstance?) {
        super(config, layoutInstance);
        this.service = QuranService.instance;
        this.load();
        return this;
    }

    load(): void {
        const self = this;
        this.template.loading();
        this.service.getSurahList().done((data: DefaultResponse) => {
            // End loading
            self.data = data.data;
            self.render(self.data, () => {
                self.template.loading(false);
                self.initializeSurahListSlider();
            });
        });
    }

    render(data: SurahList, callback): void {
        const self = this;
        const template = require('./quran.template.html');
        this.template.render(template, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

    initializeSurahListSlider(): void {
        const self = this;
        const $el = $("#surah-list");
        const slidesToShow = 9;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: true,
            // centerMode: true,
            lazyLoad: 'ondemand',
        });
        this.registerKeyboardInputs($el);
    }

    registerKeyboardInputs($carousel = $("#surah-list")): void {
        const self = this;
        this.input.addEvent('up', false, this.events['quran.prev'], () => {
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, this.events['quran.next'], () => {
            $carousel.slick('slickNext');
        });
        self.input.addEvent('enter', false, this.events['quran.enter'], () => {
            self.loadSurah(~~$carousel.find('.slick-current li').data('id'));
        });
    }

    loadSurah(surahId: number): void {
        const self = this;
        this.template.loading();
        this.service.getSurah(surahId).done((data: DefaultResponse) => {
            self.currentSurah = data.data;
            self.renderSurah(self.currentSurah, (data: any) => {
                self.template.loading(false);
                self.registerSurahKeyboardInputs();
                self.initLineHighlighter();
            });
        });
    }

    renderSurah(data: Surah, callback?): void {
        const self = this;
        const template = require('./surah.template.html');
        this.template.render(template, data, $('#surah'), 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    registerSurahKeyboardInputs(): void {
        const self = this;

        if (this.destroyEvents(this)) {
            this.input.removeEvent('back,backspace', {key: 'module.exit'});
            this.input.addEvent('back,backspace', false, this.events['quran.back'], () => {
                self.unloadSurah();
            });
            this.input.addEvent('right', false, this.events['quran.toggle'], () => {
                $('.edition').toggleClass('active');
            });
            this.input.addEvent('up', false, this.events['quran.up'], () => {
                $('.edition.active').animate({scrollTop: '-=' + self.getAyahLineHeight()}, 300);
            });
            this.input.addEvent('down', false, this.events['quran.down'], () => {
                $('.edition.active').animate({scrollTop: '+=' + self.getAyahLineHeight()}, 300);
            });
        }
    }

    initLineHighlighter(): void {
        const $highlight = $('.active-line:first');
        const $surahBody = $('.surah-body');
        if ($('.surah-header').offset().top > 30)
            $highlight.animate({'top': $surahBody.offset().top});
    }

    getAyahLineHeight(): string {
        return $('.edition.active').find('.surah-body').css('line-height');
    }

    unloadSurah(): void {
        const self = this;
        $('#surah').empty();
        this.input.removeEvent('back,backspace', {key: 'quran.back'});
        this.input.removeEvent('up', {key: 'quran.up'});
        this.input.removeEvent('down', {key: 'quran.down'});
        this.input.removeEvent('right', {key: 'quran.toggle'});
        this.registerKeyboardInputs();
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

}
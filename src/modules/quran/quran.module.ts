import {QuranService} from './quran.service';
import {DefaultResponse} from '../../_models';
import {Surah, SurahList} from './quran.model';
import {Module} from '../../libs';
import quranTemplate from './quran.template.html';
import surahTemplate from './surah.template.html';

export default class QuranModule extends Module {

    private data: SurahList;
    private currentSurah: Surah;
    protected events = {
        'quran.top': {control: 'up', title: 'بالا', icon: 'up', button: false},
        'quran.bottom': {control: 'down', title: 'پایین', icon: 'bottom', button: false},
        'quran.left': {control: 'left', title: 'چپ', icon: 'left', button: false},
        'quran.right': {control: 'right', title: 'راست', icon: 'right', button: false},
        'quran.enter': {control: 'enter', title: 'نمایش متن', icon: 'enter'},
        'quran.toggle': {control: 'blue,b', title: 'نمایش ترجمه'},
        'quran.up': {control: 'up', title: 'اسکرول بالا', icon: 'up', button: false},
        'quran.down': {control: 'down', title: 'اسکرول پایین', icon: 'bottom', button: false},
        'quran.back': {control: 'back,backspace', title: 'بازگشت به سوره‌ها', icon: 'refresh'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.service = QuranService.instance;
        this.events = this.prepareControls();
        this.load();
        return this;
    }

    load(): void {
        const self = this;
        this.templateHelper.loading();
        this.service.getSurahList().done((data: DefaultResponse) => {
            // End loading
            self.data = data.data;
            self.render(self.data, () => {
                self.templateHelper.loading(false);
                self.initializeSurahListSlider();
            });
        });
    }

    render(data: SurahList, callback): void {
        this.templateHelper.render(quranTemplate, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

    initializeSurahListSlider(): void {
        const $el = $("#surah-list");
        this.registerKeyboardInputs($el);
    }

    navigateSurahList(index: number, $el = $("#surah-list")): void {
        const $current = $('li.active');
        const $next = $el.find('li').eq($current.index() + index);
        $current.removeClass('active');
        if ($next.length) {
            $next.addClass('active');
            const distance = $next.offset().top - $el.offset().top + $el.scrollTop();
            if (~~$el.scrollTop() !== ~~distance)
                $el.animate({'scrollTop': ~~distance});
        } else {
            const $first = $el.find('li').eq(0);
            $first.addClass('active');
            $el.animate({'scrollTop': 0});
        }
    }

    registerKeyboardInputs($el = $("#surah-list")): void {
        const self = this;
        this.input.addEvent('up', false, this.events['quran.top'], () => {
            self.navigateSurahList(-4);
        });
        this.input.addEvent('down', false, this.events['quran.bottom'], () => {
            self.navigateSurahList(4);
        });
        this.input.addEvent('left', false, this.events['quran.left'], () => {
            self.navigateSurahList(1);
        });
        this.input.addEvent('right', false, this.events['quran.right'], () => {
            self.navigateSurahList(-1);
        });
        self.input.addEvent('enter', false, this.events['quran.enter'], () => {
            self.loadSurah(~~$el.find('li.active').data('id'));
        });
    }

    loadSurah(surahId: number): void {
        const self = this;
        this.templateHelper.loading();
        this.service.getSurah(surahId).done((data: DefaultResponse) => {
            self.currentSurah = data.data;
            self.renderSurah(self.currentSurah, (data: any) => {
                self.templateHelper.loading(false);
                self.registerSurahKeyboardInputs();
                self.initLineHighlighter();
            });
        });
    }

    renderSurah(data: Surah, callback?): void {
        this.templateHelper.render(surahTemplate, data, $('#surah'), 'html', function () {
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
            this.input.addEvent('blue,b', false, this.events['quran.toggle'], () => {
                $('.edition').toggleClass('active');
            });
            this.input.addEvent('up', false, this.events['quran.up'], () => {
                const $edition = $('.edition.active');
                const position = $edition.scrollTop() - self.getAyahLineHeight();
                $edition.animate({
                    scrollTop: position <= 0 ? 0 : position
                }, 300);
            });
            this.input.addEvent('down', false, this.events['quran.down'], () => {
                const $edition = $('.edition.active');
                const position = $edition.scrollTop() + self.getAyahLineHeight();
                $edition.animate({scrollTop: position}, 300);
            });
        }
    }

    initLineHighlighter(): void {
        const $highlight = $('.active-line:first');
        const $surahBody = $('.surah-body');
        if ($('.surah-header').offset().top > 30)
            $highlight.css({'top': $surahBody.offset().top});
    }

    getAyahLineHeight(): number {
        return parseInt($('.edition.active').find('.surah-body').css('line-height'));
    }

    unloadSurah(): void {
        const self = this;
        $('#surah').empty();
        this.input.removeEvent('back,backspace', {key: 'quran.back'});
        this.input.removeEvent('up', {key: 'quran.up'});
        this.input.removeEvent('down', {key: 'quran.down'});
        this.input.removeEvent('blue,b', {key: 'quran.toggle'});
        this.registerKeyboardInputs();
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

}

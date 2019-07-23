import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import {QuranService} from './quran.service';
import {DefaultResponse} from '../../_models/response.model';
import {Surah, SurahList} from './quran.model';

export default class QuranModule {

    private service;
    private template;
    private input;
    private data: SurahList;
    private currentSurah: Surah;
    private $el = $('#content');

    constructor(config?, layoutInstance?) {
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = QuranService.instance;

        this.load();

        return this;
    }

    load(): void {
        const self = this;
        this.template.loading();
        this.service.getSurahList().done((data: any) => {
            // End loading
            self.data = data.data;
            self.render(self.data, (data: any) => {
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
                callback(data);
        });
    }

    initializeSurahListSlider(): void {
        const self = this;
        const $el = $("#surah-list");
        const slidesToShow = 7;
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

        const upParams = {key: 'quran.prev', title: 'سوره قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            // Prev Program
            $carousel.slick('slickPrev');
        });

        const downParams = {key: 'quran.next', title: 'سوره بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            // Next Program
            $carousel.slick('slickNext');
        });

        const enterParams = {key: 'quran.enter', title: 'نمایش متن', icon: 'enter', button: true};
        self.input.addEvent('enter', false, enterParams, () => {
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
                // self.initializeSurahListSlider();
            });
        });
    }

    renderSurah(data: Surah, callback?): void {
        const self = this;
        const template = require('./surah.template.html');
        this.template.render(template, data, $('#surah'), 'html', function () {
            console.log(1111);
            if (typeof callback === 'function')
                callback(data);
        });
    }

}
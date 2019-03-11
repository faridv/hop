import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import {NewsService} from './news.service';
import {News} from '../../_models/news.model';
import Layouts from '../../app/layouts';

export default class NewsModule {

    private service;
    private input;
    private template;
    private config;
    private data;
    private layoutInstance: Layouts;
    private $el = $('#content');

    constructor(config?, layoutInstance?) {

        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = NewsService.instance;
        this.config = config;
        this.layoutInstance = layoutInstance;

        this.load();

        return this;
    }

    load(callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getLatest().done((data: News[]) => {
            // End loading
            self.data = data;
            self.template.loading(false);
            self.render(data, (data: News[]) => {
                self.initializeSlider();
            });
        });
    }

    initializeSlider(): void {
        const self = this;
        const $el = $("ul.news-items");
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

    render(data: News[], callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'news');
        this.template.render(templatePromise, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: NewsModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('right', {key: 'news.right'});
        self.input.removeEvent('left', {key: 'news.left'});
        self.input.removeEvent('enter', {key: 'news.enter'});
        return true;
    }

    registerKeyboardInputs($carousel): void {
        const self = this;

        const downParams = {key: 'news.right', title: 'خبر بعدی', icon: 'right', button: true};
        this.input.addEvent('right', false, downParams, () => {
            // Next News
            $carousel.slick('slickPrev');
        });

        const upParams = {key: 'news.left', title: 'خبر قبلی', icon: 'left', button: true};
        this.input.addEvent('left', false, upParams, () => {
            // Prev News
            $carousel.slick('slickNext');
        });

        const enterParams = {key: 'news.enter', title: 'نمایش خبر', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            self.loadDetails($carousel);
        });
        $(document).on('click', "ul.news-items li", (e) => {
            self.loadDetails($carousel, $(this));
        });
    }

    loadDetails($carousel, $item?): void {
        let id: number;
        let item: News;
        const self = this;

        if (typeof $item !== 'undefined' && typeof $item.attr('data-id') !== 'undefined' && $item.attr('data-id')) {
            id = ~~$item.attr('data-id')
        } else {
            id = ~~$carousel.find('.slick-current.slick-center li').attr('data-id');
        }
        this.data.forEach((news) => {
            if (news.Id === id) {
                item = news;
            }
        });

        // Load item details
        const templatePromise = this.template.load('modules', 'news-details');
        this.template.render(templatePromise, {data: item}, $('#news-details'), 'html', function () {
            self.showDetails();
        });
    }

    showDetails(): void {
        $('#news-details').fadeIn();
        const self = this;

        this.input.removeEvent('back,backspace', {key: 'module.exit'});
        const backParams = {key: 'news.back', title: 'بازگشت به اخبار', icon: 'refresh', button: true};
        this.input.addEvent('back,backspace', false, backParams, () => {
            // Return to news list
            self.hideDetails();
        });
    }

    hideDetails(): void {
        const self = this;

        $('#news-details').fadeOut();
        this.input.removeEvent('back,backspace', {key: 'news.back'});
        // this.layoutInstance.prepareUnloadModule();
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

}
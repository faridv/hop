import {NewsService} from './news.service';
import {News} from './news.model';
import {Module} from '../../libs/module';

export default class NewsModule extends Module {

    private data;
    protected template = {
        'news': './news.template.html',
        'details': './news-details.template.html',
    };
    protected events = {
        'news.next': {control: 'right', title: 'خبر بعدی', icon: 'right'},
        'news.prev': {control: 'left', title: 'خبر قبلی', icon: 'left'},
        'news.enter': {control: 'enter', title: 'نمایش خبر', icon: 'enter'},
        'news.back': {control: 'back,backspace', title: 'بازگشت به اخبار', icon: 'refresh'},
    };

    constructor(config?, layoutInstance?) {
        super(config, layoutInstance);
        this.service = NewsService.instance;
        this.load();
        return this;
    }

    load(callback?: any) {
        const self = this;
        this.templateHelper.loading();
        this.service.getLatest().done((data: any) => {
            self.data = data.data;
            self.render(self.data, (data: News[]) => {
                // End loading
                self.templateHelper.loading(false);
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
        const template = require(`${this.template.news}`);
        this.templateHelper.render(template, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    registerKeyboardInputs($carousel): void {
        const self = this;

        this.input.addEvent('right', false, this.events['news.next'], () => {
            // Next News
            $carousel.slick('slickPrev');
        });

        this.input.addEvent('left', false, this.events['news.prev'], () => {
            // Prev News
            $carousel.slick('slickNext');
        });

        this.input.addEvent('enter', false, this.events['news.enter'], () => {
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
            if (news.id === id) {
                item = news;
            }
        });

        // Load item details
        const template = require(`${this.template.details}`);
        this.templateHelper.render(template, {data: item}, $('#news-details'), 'html', function () {
            self.showDetails();
        });
    }

    showDetails(): void {
        $('#news-details').fadeIn();
        const self = this;

        this.input.removeEvent('back,backspace', {key: 'module.exit'});
        this.input.addEvent('back,backspace', false, this.events['news.back'], () => {
            // Return to news list
            self.hideDetails();
        });
    }

    hideDetails(): void {
        const self = this;

        $('#news-details').fadeOut();
        this.input.removeEvent('back,backspace', {key: 'news.back'});
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

}
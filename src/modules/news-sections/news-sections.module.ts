import { Module } from '../../libs';
import { NewsService } from '../news/news.service';
import { News, NewsCategory } from '../news/news.model';
import { DefaultResponse, Event } from '../../_models';
import newsSectionsTemplate from './news-sections.template.html';
import newsTemplate from './../news/news.template.html';
import detailsTemplate from './../news/news-details.template.html';
import * as Handlebars from 'handlebars';
import * as translations from './translations.json';
import { IConfig } from '../../_models/config.model';
import { TranslationHelper } from '../../_helpers';

export default class NewsSectionsModule extends Module {

    private lang = 'fa';
    private translations = null;
    private categories: NewsCategory;
    private data: News;
    private pageTitle = 'آخرین اخبار';
    protected playerInstance;
    protected events: Event = {
        // sections
        'sections.next': { control: 'right', title: 'بعدی', icon: 'right' },
        'sections.prev': { control: 'left', title: 'قبلی', icon: 'left' },
        'sections.enter': { control: 'enter', title: 'نمایش اخبار', icon: 'enter' },
        // news list
        'news.next': { control: 'right', title: 'خبر بعدی', icon: 'right' },
        'news.prev': { control: 'left', title: 'خبر قبلی', icon: 'left' },
        'news.enter': { control: 'enter', title: 'نمایش خبر', icon: 'enter' },
        'news.back': { control: 'back,backspace', title: 'بازگشت', icon: 'refresh' },
        // news details
        // 'news.back': { control: 'back,backspace', title: 'بازگشت به اخبار', icon: 'refresh' },
        'news.play': { control: 'blue,b', title: 'نمایش ویدیو', button: true },
        'news.scroll-up': { control: 'up', title: 'اسکرول بالا' },
        'news.scroll-down': { control: 'down', title: 'اسکرول پایین' },
    };

    constructor(config: IConfig, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.service = NewsService.instance;
        this.addHandlebarsHelper();
        this.load();
        return this;
    }

    private addHandlebarsHelper(): void {
        this.translations = new TranslationHelper(translations[this.lang]);
        Handlebars.registerHelper('translate', (value: string) => this.translations.get(value));
    }

    public load(callback?: any): void {
        const self = this;
        this.templateHelper.loading();
        this.service.getNews().done((data: DefaultResponse<NewsCategory>) => {
            self.categories = data.data;
            self.render(self.categories, (data: NewsCategory[]) => {
                // End loading
                self.templateHelper.loading(false);
                self.initializeNewsCategoriesSlider();
            });
        });
    }

    public render(data: NewsCategory, callback): void {
        const template = newsSectionsTemplate;
        this.templateHelper.render(template, { items: data, pageTitle: this.pageTitle }, this.$el, 'html', () => {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    private initializeNewsCategoriesSlider(): void {
        const self = this;
        const $el = $("ul.news-categories");
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
        this.registerCategoriesKeyboardEvent($el);
    }

    private initializeNewsSlider(): void {
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
        setTimeout(() => {
            self.registerKeyboardInputs($el);
        });
    }

    private registerCategoriesKeyboardEvent($carousel): void {
        const self = this;
        this.input.addEvent('right', false, { key: 'sections.next' }, () => {
            // Next Category
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('left', false, { key: 'sections.prev' }, () => {
            // Prev Category
            $carousel.slick('slickNext');
        });
        this.input.addEvent('enter', false, { key: 'sections.enter' }, () => {
            self.loadNewsList($carousel);
        });
        $(document).on('click', "ul.news-categories li", e => {
            e.preventDefault();
            self.loadNewsList($carousel, $(this));
        });
    }

    private removeCategoriesKeyboardEvents(): void {
        this.input.removeEvent('enter', { key: 'sections.enter' });
        this.input.removeEvent('right', { key: 'sections.next' });
        this.input.removeEvent('left', { key: 'sections.prev' });
    }

    private loadNewsList($carousel, $item?): void {
        const self = this;
        const group = $carousel.find('.slick-current li').data('group');
        this.renderNewsList(group, () => {
            self.removeCategoriesKeyboardEvents();
            self.initializeNewsSlider();
            $('#news-list').addClass('show');
        });
    }

    private renderNewsList(group: string, callback: () => void): void {
        const data = this.categories[group];
        this.templateHelper.render(newsTemplate, { items: data, pageTitle: this.translations.get(group) }, $('#news-list'), 'html', () => {
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    private registerKeyboardInputs($carousel): void {
        const self = this;
        this.input.removeEvent('back,backspace', { key: 'module.exit' });
        this.input.addEvent('back,backspace', false, { key: 'news.back' }, () => {
            // Return to categories list
            $("#news-list").removeClass('show').promise().done(() => {
                $("#news-list").empty();
                self.registerCategoriesKeyboardEvent($("ul.news-categories"));
                setTimeout(() => {
                    self.layoutInstance.prepareUnloadModule();
                });
            });
        });
        this.input.addEvent('right', false, { key: 'news.next' }, () => {
            // Next News
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('left', false, { key: 'news.prev' }, () => {
            // Prev News
            $carousel.slick('slickNext');
        });
        this.input.addEvent('enter', false, { key: 'news.enter' }, () => {
            self.loadDetails($carousel);
        });
        $(document).on('click', "ul.news-items li", (e) => {
            self.loadDetails($carousel, $(e.target));
        });
    }

    private loadDetails($carousel, $item?): void {
        const self = this;
        const id = (typeof $item !== 'undefined'
            && typeof $item.attr('data-id') !== 'undefined'
            && $item.attr('data-id'))
            ? ~~$item.attr('data-id')
            : ~~$carousel.find('.slick-current.slick-center li').attr('data-id');
        // const item = this.data.find(news => news.id === id);
        this.service.getNewsDetails(id).done((data: DefaultResponse<News>) => {
            const item = self.data = data.data;
            const template = detailsTemplate;
            // Load item details
            this.templateHelper.render(template, { data: item }, $('#news-details'), 'html', () => {
                self.showDetails(!!item.media);
            });
        });

    }

    private showDetails(hasVideo: boolean = false): void {
        $('#news-details').fadeIn();
        const self = this;
        const $newsDetails = $('#news-details .inner .news-body');
        $newsDetails.css('top', '0');
        if (hasVideo) {
            this.input.addEvent('blue,b', false, { key: 'news.play' }, () => {
                // play video
                self.playVideo();
            });
        }
        this.input.addEvent('down', false, { key: 'news.scroll-down' }, () => {
            const newsHeight = $newsDetails.height() - $newsDetails.parent().height();
            if (newsHeight >= Math.abs(parseInt($newsDetails.css('top').replace('px', '')))) {
                const scrollValue = parseInt($newsDetails.css('top').replace('px', '')) - 100;
                $newsDetails.css('top', scrollValue.toString() + 'px');
            }
        });
        this.input.addEvent('up', false, { key: 'news.scroll-up' }, () => {
            const scrollValue = parseInt($newsDetails.css('top').replace('px', '')) + 100;
            if (scrollValue <= 0)
                $newsDetails.css('top', scrollValue.toString() + 'px');
        });
        this.input.removeEvent('back,backspace', { key: 'module.exit' });
        this.input.addEvent('back,backspace', false, { key: 'news.back' }, () => {
            // Return to news list
            self.hideDetails();
        });
    }

    private hideDetails(): void {
        const self = this;
        $('#news-details').fadeOut(() => {
            $('#news-details').empty();
        });
        this.input.removeEvent('blue,b', { key: 'news.play' });
        this.input.removeEvent('back,backspace', { key: 'news.back' });
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

    private playVideo(): void {
        const self = this;
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const $newsDetails = $('.news-details');
        const playerParams = {
            unloadMethod: () => {
                self.playerInstance.unload();
            },
            sources: [{
                src: $newsDetails.attr('data-media'),
                poster: $newsDetails.find('img').attr('src'),
                type: 'video/mp4'
            }]
        };
        this.playerInstance = new this.playerService('mediaplayer', playerParams);
    }

}

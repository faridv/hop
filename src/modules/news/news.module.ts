import {NewsService} from './news.service';
import {News} from './news.model';
import {Module} from '../../libs';
import newsTemplate from './news.template.html';
import detailsTemplate from './news-details.template.html';
import uhdNewsTemplate from './news-uhd.template.html';
import uhdDetailsTemplate from './news-uhd-details.template.html';

export default class NewsModule extends Module {

    private data;
    private pageTitle = 'آخرین اخبار';
    protected playerInstance;
    protected events = {
        'news.next': {control: 'right', title: 'خبر بعدی', icon: 'right'},
        'news.prev': {control: 'left', title: 'خبر قبلی', icon: 'left'},
        'news.enter': {control: 'enter', title: 'نمایش خبر', icon: 'enter'},
        'news.back': {control: 'back,backspace', title: 'بازگشت به اخبار', icon: 'refresh'},
        'news.play': {control: 'blue,b', title: 'نمایش ویدیو', button: true},
        'news.scroll-up': {control: 'up', title: 'اسکرول بالا'},
        'news.scroll-down': {control: 'down', title: 'اسکرول پایین'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.service = NewsService.instance;
        this.load();
        return this;
    }

    public load(callback?: any) {
        const self = this;
        let id: string = null;
        let service = 'getByCategory';

        this.templateHelper.loading();

        if (typeof this.moduleType !== 'undefined' && this.moduleType) {
            switch (this.moduleType) {
                case 'uhd-programs':
                    service = 'getUhdItems';
                    this.pageTitle = 'برنامه‌ها';
                    id = '4';
                    break;
                case 'news-teaching':
                    this.pageTitle = 'آموزش کسب و کار';
                    id = '85';
                    break;
                case 'tourism':
                    this.pageTitle = 'ایران گردی';
                    id = '115,116,117,118,126';
                    break;
                case 'multimedia':
                    this.pageTitle = 'چندرسانه‌ای';
                    id = '17,23,100';
                    break;
            }
        }
        this.service[service](id).done((data: any) => {
            self.data = data.data;
            self.render(self.data, (data: News[]) => {
                // End loading
                self.templateHelper.loading(false);
                self.initializeSlider();
            });
        });
    }


    public render(data: News[], callback): void {
        console.log(this.layoutInstance);
        const template = this.layoutInstance.layout === 'uhd' ? uhdNewsTemplate : newsTemplate;
        this.templateHelper.render(template, {items: data, pageTitle: this.pageTitle}, this.$el, 'html', () => {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    private initializeSlider(): void {
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

    private registerKeyboardInputs($carousel): void {
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

    private loadDetails($carousel, $item?): void {
        const self = this;
        const id = (typeof $item !== 'undefined'
            && typeof $item.attr('data-id') !== 'undefined'
            && $item.attr('data-id'))
            ? ~~$item.attr('data-id')
            : ~~$carousel.find('.slick-current.slick-center li').attr('data-id');
        const item = this.data.find(news => news.id === id);
        // Load item details
        const template = this.layoutInstance.layout === 'uhd' ? uhdDetailsTemplate : detailsTemplate;
        this.templateHelper.render(template, {data: item}, $('#news-details'), 'html', () => {
            self.showDetails(!!item.media);
        });
    }

    private showDetails(hasVideo: boolean = false): void {
        $('#news-details').fadeIn();
        const self = this;
        const $newsDetails = $('#news-details .inner .news-body');
        $newsDetails.css('top', '0');
        if (hasVideo) {
            this.input.addEvent('blue,b', false, this.events['news.play'], () => {
                // play video
                self.playVideo();
            });
        }
        this.input.addEvent('down', false, this.events['news.scroll-down'], () => {
            const scrollValue = parseInt($newsDetails.css('top').replace('px', '')) - 100;
            $newsDetails.css('top', scrollValue.toString() + 'px');
        });
        this.input.addEvent('up', false, this.events['news.scroll-up'], () => {
            const scrollValue = parseInt($newsDetails.css('top').replace('px', '')) + 100;
            if (scrollValue <= 0)
                $newsDetails.css('top', scrollValue.toString() + 'px');
        });
        this.input.removeEvent('back,backspace', {key: 'module.exit'});
        this.input.addEvent('back,backspace', false, this.events['news.back'], () => {
            // Return to news list
            self.hideDetails();
        });
    }

    private hideDetails(): void {
        const self = this;
        $('#news-details').fadeOut(() => {
            $('#news-details').empty();
        });
        this.input.removeEvent('blue,b', {key: 'news.play'});
        this.input.removeEvent('back,backspace', {key: 'news.back'});
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

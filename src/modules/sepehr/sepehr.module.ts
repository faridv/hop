import * as moment from 'moment-jalaali';
import { Module } from '../../libs';
import template from './sepehr.template.html';
import categoriesTemplate from './sepehr-categories.template.html';
import channelsTemplate from './sepehr-channels.template.html';
import epgTemplate from './sepehr-epg.template.html';
import { SepehrService } from './sepehr.service';
import { DefaultResponse } from '../../_models';
import { SepehrCategories, SepehrChannel } from './sepehr.models';
import * as $ from 'jquery';
import { VideoJsOptions } from '../../_models/VideoJsOptions';

export default class SepehrModule extends Module {

    // temp
    tmp = [categoriesTemplate, channelsTemplate, epgTemplate];
    private readonly currentDate;
    protected events = {
        'sepehr-categories.prev': { control: 'right', title: 'قبلی', icon: 'right' },
        'sepehr-categories.next': { control: 'left', title: 'بعدی', icon: 'left' },
        'sepehr-categories.enter': { control: 'enter', title: 'انتخاب', icon: 'enter' },

        'sepehr-channels.prev': { control: 'up', title: 'قبلی', icon: 'up' },
        'sepehr-channels.next': { control: 'down', title: 'بعدی', icon: 'down' },
        'sepehr-channels.back': { control: 'back', title: 'بازگشت', icon: 'back' },
        // 'sepehr-channels.enter': {control: 'enter', title: 'انتخاب', icon: 'enter'},

        'sepehr-live.enter': { control: 'blue,b', title: 'پخش زنده', icon: 'square', button: true },
    };

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);

        moment.locale('en');
        this.currentDate = moment().format('YYYY-MM-DD');
        this.service = SepehrService.instance;
        this.events = this.prepareControls();

        this.loadCategories();
        // this.render();
        this.templateHelper.loading();

        return this;
    }

    public render(callback?: (() => any)): void {
        this.templateHelper.render(template, {}, this.$el, 'html');
    }

    // Categories

    private loadCategories(): void {
        const self = this;
        this.service.getCategories().done((response: DefaultResponse<SepehrCategories[]>) => {
            this.templateHelper.render(categoriesTemplate, response.data, this.$el, 'html');
            self.initializeCategoriesSlider();
            self.templateHelper.loading(false);
        });
    }

    private initializeCategoriesSlider(): void {
        const self = this;
        const $el = $("ul.sepehr-categories");
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('afterChange', () => {
            self.input.removeEvent('enter', self.events['sepehr-categories.enter']);
            setTimeout(() => {
                self.input.addEvent('enter', false, self.events['sepehr-categories.enter'], () => {
                    self.loadCategoryChannels($el);
                });
            }, 100);
        });
        $el.slick({
            rtl: $("body").hasClass('rtl'),
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
        });
        $el.slick('slickGoTo', 0, true);
        this.registerCategoriesKeyboardInputs($el);
    }

    private loadCategoryChannels($list): void {
        const categoryId = $list.find('.slick-current li').data('id');
        this.loadChannelsByCategoryId(categoryId);
    }

    private registerCategoriesKeyboardInputs($carousel = $("ul.sepehr-categories")): void {
        this.input.addEvent('right', false, this.events['sepehr-categories.prev'], () => {
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('left', false, this.events['sepehr-categories.next'], () => {
            $carousel.slick('slickNext');
        });
    }

    private removeCategoriesKeyboardInputs(): void {
        this.input.removeEvent('right', this.events['sepehr-categories.prev']);
        this.input.removeEvent('left', this.events['sepehr-categories.next']);
        this.input.removeEvent('enter', this.events['sepehr-categories.enter']);
    }

    // Channels List

    private loadChannelsByCategoryId(categoryId: number): void {
        const self = this;
        let service: any;
        if (categoryId < 0) {
            // load all
            service = this.service.getChannels();
        } else {
            service = this.service.getChannelsByCategory(categoryId)
        }
        service.done((response: DefaultResponse<SepehrChannel[]>) => {
            self.renderChannels(response.data, () => {
                self.removeCategoriesKeyboardInputs();
                self.handleChannelsCarousel();
            });
        });
    }

    private handleChannelsCarousel(): void {
        const self = this;
        const $el = $(".channels ul");
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('afterChange', () => {
            self.input.removeEvent('blue,b', self.events['sepehr-live.enter']);
            setTimeout(() => {
                self.input.addEvent('blue,b', false, self.events['sepehr-live.enter'], () => {
                    self.playChannelStream($el);
                });
            }, 100);
        });
        $el.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            lazyLoad: 'ondemand',
        });
        $el.slick('slickGoTo', 0, true);
        this.registerChannelsKeyboardInputs($el);
    }

    private renderChannels(data: SepehrChannel[], callback?: (() => any)): void {
        const $channels = $('.channels');
        this.templateHelper.render(channelsTemplate, data, $channels, 'html', () => {
            $channels.addClass('active');
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    private hideChannels(): void {
        const self = this;
        const $channels = $('.channels');
        $channels.removeClass('active');
        this.removeChannelKeyInputs();
        setTimeout(() => {
            $channels.empty();
            self.registerCategoriesKeyboardInputs($("ul.sepehr-categories"));
        }, 500);
    }

    private registerChannelsKeyboardInputs($carousel?): void {
        $carousel = typeof $carousel !== 'undefined' && $carousel ? $carousel : $(".channels ul");
        const self = this;
        this.input.removeEvent('back,backspace', { key: 'sepehr-channels.back' });
        this.input.addEvent('back,backspace', false, this.events['sepehr-channels.back'], () => {
            // Return to news list
            self.hideChannels();
        });
        this.input.addEvent('up', false, { key: 'sepehr-channels.prev' }, () => {
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, { key: 'sepehr-channels.next' }, () => {
            $carousel.slick('slickNext');
        });
    }

    private removeChannelKeyInputs(): void {
        const self = this;
        this.input.removeEvent('back,backspace', { key: 'sepehr-channels.back' });
        this.input.removeEvent('up', { key: 'sepehr-channels.prev' });
        this.input.removeEvent('down', { key: 'sepehr-channels.next' });
        this.input.removeEvent('blue,b', { key: 'sepehr-live.enter' });
        setTimeout(() => {
            self.layoutInstance.prepareUnloadModule();
        }, 500);
    }

    // Live Stream
    private playChannelStream($carousel): void {
        const self = this;
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const $current = $carousel.find('.slick-current.slick-center li');
        const playerParams = {
            unloadMethod: () => {
                alert();
                self.playerInstance.unload();
                self.registerChannelsKeyboardInputs();
            },
            liveui: true,
            poster: $current.find('figure > img').attr('src'),
            sources: [{
                src: $current.data('media'),
                type: 'application/x-mpegURL',
            }],
            html5: {
                vhs: {
                    overrideNative: true
                }
            }
        };
        this.input.removeEvent('back,backspace', { key: 'sepehr-channels.back' });
        this.input.removeEvent('blue,b', self.events['sepehr-live.enter']);
        this.playerInstance = new this.playerService('mediaplayer', playerParams);
    }

}

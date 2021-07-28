import * as moment from 'moment-jalaali';
import { Module } from '../../libs';
import template from './sepehr.template.html';
import categoriesTemplate from './sepehr-categories.template.html';
import channelsTemplate from './sepehr-channels.template.html';
import epgTemplate from './sepehr-epg.template.html';
import { SepehrService } from './sepehr.service';
import { DefaultResponse } from '../../_models';
import { SepehrCategories, SepehrChannel, SepehrEpg } from './sepehr.models';
import * as $ from 'jquery';

export default class SepehrModule extends Module {

    private readonly currentDate;
    protected events = {
        'sepehr-categories.prev': { control: 'right', title: 'قبلی', icon: 'right' },
        'sepehr-categories.next': { control: 'left', title: 'بعدی', icon: 'left' },
        'sepehr-categories.enter': { control: 'enter', title: 'انتخاب', icon: 'enter' },
        'sepehr-categories.back': { control: 'back,backspace', title: 'بازگشت', icon: 'refresh' },

        'sepehr-channels.prev': { control: 'up', title: 'قبلی', icon: 'up' },
        'sepehr-channels.next': { control: 'down', title: 'بعدی', icon: 'bottom' },
        'sepehr-channels.back': { control: 'back,backspace', title: 'بازگشت', icon: 'refresh' },

        'sepehr-epg.prev': { control: 'up', title: 'برنامه قبلی', icon: 'up' },
        'sepehr-epg.next': { control: 'down', title: 'برنامه بعدی', icon: 'bottom' },
        'sepehr-epg.back': { control: 'back,backspace', title: 'بازگشت', icon: 'refresh' },

        'sepehr-live.enter': { control: 'blue,b', title: 'پخش زنده', icon: 'square', button: true },
        'sepehr-epg.enter': { control: 'green,g', title: ' جدول پخش', icon: 'square', button: true },
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
            self.reRegisterColorButtons($el);
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

    private reRegisterColorButtons($el = $(".channels ul")) {
        const self = this;
        self.input.removeEvent('blue,b', self.events['sepehr-live.enter']);
        self.input.removeEvent('green,g', self.events['sepehr-epg.enter']);
        setTimeout(() => {
            self.input.addEvent('blue,b', false, self.events['sepehr-live.enter'], () => {
                self.playChannelStream($el);
            });
            self.input.addEvent('green,g', false, self.events['sepehr-epg.enter'], () => {
                self.loadEpgByChannelId($el);
            });
        }, 100);
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
        }, 100);
    }

    private registerChannelsKeyboardInputs($carousel?): void {
        $carousel = typeof $carousel !== 'undefined' && $carousel ? $carousel : $(".channels ul");
        const self = this;
        this.input.removeEvent('back,backspace', this.events['sepehr-categories.back']);
        setTimeout(() => {
            self.input.addEvent('back,backspace', false, this.events['sepehr-channels.back'], () => {
                self.hideChannels();
            });
        }, 50);
        this.input.addEvent('up', false, this.events['sepehr-channels.prev'], () => {
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, this.events['sepehr-channels.next'], () => {
            $carousel.slick('slickNext');
        });
    }

    private removeChannelKeyInputs(backFromVideo: boolean = false): void {
        const self = this;
        this.input.removeEvent('back,backspace', self.events['sepehr-channels.back']);
        this.input.removeEvent('up', this.events['sepehr-channels.prev']);
        this.input.removeEvent('down', this.events['sepehr-channels.next']);
        this.input.removeEvent('blue,b', this.events['sepehr-live.enter']);
        this.input.removeEvent('green,g', this.events['sepehr-epg.enter']);
        if (!backFromVideo) {
            setTimeout(() => {
                self.layoutInstance.prepareUnloadModule();
            }, 100);
        }
    }

    // Live Stream
    private playChannelStream($carousel): void {
        const self = this;
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const $current = $carousel.find('.slick-current.slick-center li');
        const playerParams = {
            unloadMethod: () => {
                self.registerChannelsKeyboardInputs();
                self.reRegisterColorButtons();
                self.playerInstance.unload();
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
        this.removeChannelKeyInputs(true);
        this.playerInstance = new this.playerService('mediaplayer', playerParams);
    }

    // EPG
    private loadEpgByChannelId($carousel): void {
        moment.locale('en');
        const self = this;
        const $current = $carousel.find('.slick-current.slick-center li');
        this.templateHelper.loading();
        this.service.getEpg($current.data('id'), moment().format('YYYY-MM-DD')).done((response: DefaultResponse<SepehrEpg[]>) => {
            self.renderEpg(response.data, () => {
                self.initializeEpgSlider();
                self.templateHelper.loading(false);
                $('.epg').addClass('active');
            })
        });
    }

    private renderEpg(items: SepehrEpg[], callback): void {
        this.templateHelper.render(epgTemplate, { items }, $('.epg'), 'html', () => {
            if (typeof callback === 'function')
                callback(items);
        });
    }

    private initializeEpgSlider(): void {
        const self = this;
        const $el = $("ul.schedule-items");
        const slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('init', () => {
            setTimeout(() => {
                self.goToCurrentEpgItem($el);
            }, 50);
        });
        $el.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            lazyLoad: 'ondemand',
        });
        this.registerEpgKeyboardInputs($el);
    }

    private goToCurrentEpgItem($carousel): void {
        const self = this;
        try {
            const $current = $carousel.find('li.current').parents('.slick-slide:first');
            $carousel.slick('slickGoTo', $current.attr('data-slick-index'), true);
        } catch (e) {
            setTimeout(() => {
                self.goToCurrentEpgItem($carousel);
            }, 50);
            return;
        }
    }

    private registerEpgKeyboardInputs($carousel = $("ul.schedule-items")): void {
        const self = this;
        this.removeChannelKeyInputs();
        this.input.addEvent('back,backspace', false, this.events['sepehr-epg.back'], () => {
            $('.epg').empty().removeClass('active');
            self.removeEpgKeyboardListeners();
        });
        this.input.addEvent('up', false, this.events['sepehr-epg.prev'], () => {
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, this.events['sepehr-epg.next'], () => {
            $carousel.slick('slickNext');
        });
    }

    private removeEpgKeyboardListeners(): void {
        const self = this;
        this.input.removeEvent('back,backspace', this.events['sepehr-epg.back']);
        this.input.removeEvent('up', this.events['sepehr-epg.prev']);
        this.input.removeEvent('down', this.events['sepehr-epg.next']);
        setTimeout(() => {
            self.registerChannelsKeyboardInputs();
        })
    }
}

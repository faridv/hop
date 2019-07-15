import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import {ScheduleService} from "./../schedule/schedule.service";
import {Schedule} from "../schedule/schedule.model";
import {PlayerService} from '../../_helpers/player.helper';

export default class ScheduleCarouselModule {

    private service;
    private input;
    private config;
    private template;
    private $el = $('#content');
    private currentDate;
    private layoutInstance;
    private playerService;
    private playerInstance;

    constructor(config?, layoutInstance?) {

        moment.locale('en');
        this.currentDate = moment();

        this.config = config;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = ScheduleService.instance;
        this.layoutInstance = layoutInstance;
        this.playerService = PlayerService;

        const self = this;

        this.load(this.currentDate);

        return this;
    }

    load(date, callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: any) => {
            // End loading
            self.render(data.data, (data: Schedule[]) => {
                self.template.loading(false);
                self.initializeSlider();
                if (typeof callback === 'function')
                    callback(data);
            });
        });
    }

    initializeSlider(): void {
        const self = this;
        const $el = $("ul.schedule-items");
        const slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('afterChange', () => {
            self.input.removeEvent('enter', {key: 'schedule.enter'});
            setTimeout(() => {
                if ($('.slick-center').find('li.video').length) {
                    const enterParams = {key: 'schedule.enter', title: 'پخش ویدیو', icon: 'enter', button: true};
                    self.input.addEvent('enter', false, enterParams, () => {
                        self.playVideo($el);
                    });
                } else {
                    self.input.removeEvent('enter', {key: 'schedule.enter'});
                }
            }, 100);
        });
        $el.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            lazyLoad: 'ondemand',
        });
        this.goToCurrent($el);
        this.registerKeyboardInputs($el);
    }

    goToCurrent($carousel): void {
        const self = this;
        try {
            const $current = $carousel.find('li.current').parents('.slick-slide:first');
            $carousel.slick('slickGoTo', $current.attr('data-slick-index'), true);
        } catch (e) {
            console.log(e);
            setTimeout(() => {
                self.goToCurrent($carousel);
            }, 200);
            return;
        }
    }

    findCurrent(list: Schedule[]): Schedule[] {
        const today = moment();
        if (this.currentDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
            let currentIndex: number = 9999;
            for (let index in list) {
                let momentDate = moment(list[index].start, 'HH:mm:ss')
                    .set({
                        'year': today.format('YYYY'),
                        'month': today.format('MM') - 1,
                        'date': today.format('DD')
                    });
                if (momentDate < today)
                    currentIndex = ~~index;
            }
            if (typeof list[currentIndex] !== 'undefined')
                list[currentIndex]['isCurrent'] = true;
        } else {
            // list[0]['current'] = true;
        }
        return list;
    }

    render(items: Schedule[], callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'schedule-carousel');
        items = self.findCurrent(items);
        // items = self.getMediaUrl(items);
        this.template.render(templatePromise, {items: items}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(items);
        });
    }

    // getMediaUrl(items: Schedule[]): Schedule[] {
    //     items.forEach((item) => {
    //         if (item.hasVideo && item.episodeThumbnail) {
    //             item.episodeMedia = item.episodeThumbnail.replace('.jpg', '_whq.mp4');
    //             console.log(item.episodeMedia);
    //         }
    //     });
    //     return items;
    // }

    destroy(instance?: ScheduleCarouselModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', {key: 'schedule.prev'});
        self.input.removeEvent('down', {key: 'schedule.next'});
        self.input.removeEvent('down', {key: 'schedule.next'});
        // self.input.removeEvent('left', {key: 'schedule.left'});
        // self.input.removeEvent('right', {key: 'schedule.right'});
        self.input.removeEvent('enter', {key: 'schedule.enter'});
        self.input.removeEvent('back,backspace', {key: 'module.exit'});
        return true;
    }

    registerKeyboardInputs($carousel = $("ul.schedule-items")): void {
        const self = this;

        const upParams = {key: 'schedule.prev', title: 'برنامه قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            // Prev Program
            $carousel.slick('slickPrev');
        });

        const downParams = {key: 'schedule.next', title: 'برنامه بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            // Next Program
            $carousel.slick('slickNext');
        });
    }

    getMediaUrl($element): void {
        const self = this;
        const id = $element.data('id');
        this.template.loading();
        this.service.getMedia(id).done((data: any) => {
            // End loading
            const item = data.data;
            self.template.loading(false);
            self.initPlayback(item.thumbnail, item.video);
        });
    }

    initPlayback(poster: string, src: string) {
        const self = this;
        const playerParams = {
            unloadMethod: () => {
                setTimeout(() => {
                    self.registerKeyboardInputs();
                    setTimeout(() => {
                        self.layoutInstance.prepareUnloadModule();
                    }, 500);
                }, 200);
            },
            sources: [{
                src: src,
                poster: poster,
                type: 'video/mp4'
            }]
        };
        this.playerInstance = new this.playerService('mediaplayer', playerParams);
        this.destroy();
    }

    playVideo($carousel): void {
        const self = this;
        if (this.template.hasClass('player-mode'))
            return;
        const $current = $carousel.find('.slick-current.slick-center li');
        if (!$current.hasClass('video'))
            return;
        this.getMediaUrl($current);
    }

}
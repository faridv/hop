import * as moment from 'moment-jalaali';
import { ScheduleService } from "./schedule.service";
import { Schedule } from "./schedule.model";
import { Module } from '../../libs';
import template from './schedule-carousel.template.html';

export default class ScheduleCarouselModule extends Module {

    protected events = {
        'schedule.prev': { 'control': 'up', title: 'برنامه قبلی', icon: 'up' },
        'schedule.next': { 'control': 'down', title: 'برنامه بعدی', icon: 'bottom' },
        'schedule.enter': { 'control': 'enter', title: 'پخش ویدیو', icon: 'enter' },
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        moment.locale('en');
        this.service = ScheduleService.instance;
        this.events = this.prepareControls();
        this.load(moment());

        return this;
    }

    public load(date, callback?: any): void {
        const self = this;
        this.templateHelper.loading();
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: any) => {
            // End loading
            self.render(data.data, (data: Schedule[]) => {
                self.initializeSlider();
                self.templateHelper.loading(false);
                if (typeof callback === 'function')
                    callback(data);
            });
        });
    }

    private initializeSlider(): void {
        const self = this;
        const $el = $("ul.schedule-items");
        const slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.on('init', () => {
            setTimeout(() => {
                self.goToCurrent($el);
            }, 100);
        });
        $el.on('afterChange', () => {
            self.input.removeEvent('enter', self.events['schedule.enter']);
            setTimeout(() => {
                if ($('.slick-center').find('li.video').length) {
                    self.input.addEvent('enter', false, self.events['schedule.enter'], () => {
                        self.playVideo($el);
                    });
                } else {
                    self.input.removeEvent('enter', self.events['schedule.enter']);
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
        this.registerKeyboardInputs($el);
    }

    private goToCurrent($carousel): void {
        const self = this;
        console.log(this);
        try {
            const $current = $carousel.find('li.current').parents('.slick-slide:first');
            $carousel.slick('slickGoTo', $current.attr('data-slick-index'), true);
        } catch (e) {
            setTimeout(() => {
                self.goToCurrent($carousel);
            }, 200);
            return;
        }
    }

    private findCurrent(list: Schedule[]): Schedule[] {
        const rightNow = moment();
        let currentIndex: number = 9999;
        list.map(item => item.isCurrent = false);
        for (let index in list) {
            const currentItemTime = moment(list[index].start, 'YYYY-MM-DD HH:mm:ss');
            if (rightNow.isAfter(currentItemTime)) {
                currentIndex = parseInt(index);
            }
        }
        if (typeof list[currentIndex] !== 'undefined') {
            list[currentIndex].isCurrent = true;
        }
        return list;
    }

    public render(items: Schedule[], callback): void {
        const self = this;
        items = self.findCurrent(items);
        this.templateHelper.render(template, { items: items }, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(items);
        });
    }

    private registerKeyboardInputs($carousel = $("ul.schedule-items")): void {
        this.input.addEvent('up', false, this.events['schedule.prev'], () => {
            // Prev Program
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, this.events['schedule.next'], () => {
            // Next Program
            $carousel.slick('slickNext');
        });
    }

    private getMediaUrl($element): void {
        const self = this;
        const id = $element.data('id');
        this.templateHelper.loading();
        this.service.getMedia(id).done((data: any) => {
            // End loading
            const item = data.data;
            self.templateHelper.loading(false);
            self.initPlayback(item.thumbnail, item.video);
        });
    }

    private initPlayback(poster: string, src: string) {
        const self = this;
        const playerParams = {
            unloadMethod: () => {
                setTimeout(() => {
                    self.registerKeyboardInputs();
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

    private playVideo($carousel): void {
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const $current = $carousel.find('.slick-current.slick-center li');
        if (!$current.hasClass('video'))
            return;
        this.getMediaUrl($current);
    }

}

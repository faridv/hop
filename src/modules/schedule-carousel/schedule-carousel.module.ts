import * as moment from 'moment-jalaali';
import {ScheduleService} from "./schedule.service";
import {Schedule} from "./schedule.model";
import {Module} from '../../libs';
import template from './schedule-carousel.template.html';

export default class ScheduleCarouselModule extends Module {

    private currentDate;
    protected events = {
        'schedule.prev': {'control': 'up', title: 'برنامه قبلی', icon: 'up'},
        'schedule.next': {'control': 'down', title: 'برنامه بعدی', icon: 'bottom'},
        'schedule.enter': {'control': 'enter', title: 'پخش ویدیو', icon: 'enter'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        moment.locale('en');
        this.currentDate = moment();
        this.service = ScheduleService.instance;
        this.events = this.prepareControls();
        this.load(this.currentDate);

        return this;
    }

    load(date, callback?: any) {
        const self = this;
        this.templateHelper.loading();
        console.time('loading data');
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: any) => {
            // End loading
            console.timeEnd('loading data');
            console.time('rendering');
            self.render(data.data, (data: Schedule[]) => {
                console.timeEnd('rendering');
                console.time('slider');
                self.initializeSlider();
                self.templateHelper.loading(false);
                console.timeEnd('slider');
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
        this.goToCurrent($el);
        this.registerKeyboardInputs($el);
    }

    goToCurrent($carousel): void {
        const self = this;
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
        items = self.findCurrent(items);
        this.templateHelper.render(template, {items: items}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(items);
        });
    }

    registerKeyboardInputs($carousel = $("ul.schedule-items")): void {
        this.input.addEvent('up', false, this.events['schedule.prev'], () => {
            // Prev Program
            $carousel.slick('slickPrev');
        });
        this.input.addEvent('down', false, this.events['schedule.next'], () => {
            // Next Program
            $carousel.slick('slickNext');
        });
    }

    getMediaUrl($element): void {
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

    initPlayback(poster: string, src: string) {
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

    playVideo($carousel): void {
        if (this.templateHelper.hasClass('player-mode'))
            return;
        const $current = $carousel.find('.slick-current.slick-center li');
        if (!$current.hasClass('video'))
            return;
        this.getMediaUrl($current);
    }

}

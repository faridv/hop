import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import {ScheduleService} from "./../schedule/schedule.service";
import {Schedule} from "../../_models/schedule.model";

export default class ScheduleCarouselModule {

    private service;
    private input;
    private config;
    private template;
    private $el = $('#content');
    private currentDate;

    constructor(config?, layoutInstance?) {

        moment.locale('en');
        this.currentDate = moment();

        this.config = config;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = ScheduleService.instance;
        const self = this;

        this.load(this.currentDate, (c) => {
            // self.registerEvents();
        });

        return this;
    }

    load(date, callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: Schedule[]) => {
            // End loading
            self.template.loading(false);
            self.render(data, (data: Schedule[]) => {
                self.initializeSlider();
                // $('.schedule-items').scrollTop(0);
                // if ($('.schedule-items li.current').length) {
                //     setTimeout(() => {
                //         $('.schedule-items').animate({
                //             scrollTop: $('.schedule-items li.current').offset().top - 100
                //         });
                //     }, 500);
                // } else {
                //     $('.schedule-items li').first().addClass('active');
                // }
                // $('.schedule-items').on('')
            });
        });
    }

    initializeSlider(): void {
        const self = this;
        const $el = $("ul.schedule-items");
        const slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        $el.slick({
            // rtl: $("body").hasClass('rtl'),
            // accessibility: false,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            // focusOnSelect: true,
            // infinite: false,
            // speed: self.config.transitionSpeed,
            // useCSS: false,
            // useTransform: false
        });
        this.goToCurrent($el);
        this.registerKeyboardInputs($el);
    }

    goToCurrent($carousel): void {
        const $current = $carousel.find('li.current').parents('.slick-slide:first');
        $carousel.slick('slickGoTo', $current.attr('data-slick-index'));
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
        items = self.getMediaUrl(items);
        this.template.render(templatePromise, {items: items}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(items);
        });
    }

    getMediaUrl(items: Schedule[]): Schedule[] {
        // https://cdn.iktv.ir/mediaimages/69707.jpg
        // https://cdn.iktv.ir/videos/20190216/69707_whq.mp4
        items.forEach((item) => {
            if (item.hasVideo) {
                const fileName = item.thumbnail.split('/').pop();
                item.media = 'https://cdn.iktv.ir/videos/20190216/' + fileName + '_whq.mp4'
            }
        });

    }

    destroy(instance?: ScheduleCarouselModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', {key: 'schedule.prev'});
        self.input.removeEvent('down', {key: 'schedule.next'});
        self.input.removeEvent('left', {key: 'schedule.left'});
        self.input.removeEvent('right', {key: 'schedule.right'});
        self.input.removeEvent('enter', {key: 'schedule.enter'});
        return true;
    }

    setActive(which: string): void {
        const $current = $('.schedule-items li.active');
        if (which === 'next') {
            if ($current.next('li').length) {
                $current.next('li').addClass('active');
                $current.removeClass('active');
            }
        } else {
            if ($current.prev('li').length) {
                $current.prev('li').addClass('active');
                $current.removeClass('active');
            }
        }
        const $activeElement = $('.schedule-items li.active');
        $('.schedule-items').animate({
            scrollTop: $activeElement.position().top + $('.schedule-items').scrollTop() - 100
        });
    }

    registerKeyboardInputs($carousel?): void {
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

        const enterParams = {key: 'schedule.enter', title: 'نمایش برنامه', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            self.loadDetails($carousel);
        });
    }

    loadDetails($carousel, $item?): void {
        const self = this;
        const $current = $carousel.find('.slick-current.slick-center');
        // Load item details
        // const templatePromise = this.template.load('modules', 'news-details');
        // this.template.render(templatePromise, {data: item}, $('#news-details'), 'html', function () {
        //     self.showDetails();
        // });

    }

    showDetails(): void {

    }
}
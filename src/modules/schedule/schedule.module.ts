import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import {ScheduleService} from "./schedule.service";
import {Schedules} from "../../_models/schedule.model";

export default class ScheduleModule {

    private service;
    private input;
    private template;
    private $el = $('#content');
    private currentDate;

    constructor(Config?) {

        moment.locale('en');
        this.currentDate = moment();

        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = ScheduleService.instance;
        const self = this;

        this.registerKeyboardInputs();
        this.load(this.currentDate, (c) => {
            // self.registerEvents();
        });

        return this;
    }

    load(date, callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: Schedules) => {
            // End loading
            self.template.loading(false);
            self.render(data, (data: Schedules) => {
                $('.schedule-items').scrollTop(0);
                if ($('.schedule-items li.current').length) {
                    setTimeout(() => {
                        $('.schedule-items').animate({
                            scrollTop: $('.schedule-items li.current').offset().top - 100
                        });
                    }, 500);
                } else {
                    $('.schedule-items li').first().addClass('active');
                }
                // $('.schedule-items').on('')
            });
        });
    }

    findCurrent(list: Schedules): Schedules {
        const today = moment();
        if (this.currentDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
            let currentIndex: number = 9999;
            for (let index in list) {
                let momentDate = moment(list[index].time, 'HH:mm:ss')
                    .set({
                        'year': today.format('YYYY'),
                        'month': today.format('MM') - 1,
                        'date': today.format('DD')
                    });
                if (momentDate < today)
                    currentIndex = ~~index;
            }
            if (typeof list[currentIndex] !== 'undefined')
                list[currentIndex]['current'] = true;
        } else {
            // list[0]['current'] = true;
        }
        return list;
    }

    render(data: Schedules, callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'schedule');
        data = self.findCurrent(data);
        this.template.render(templatePromise, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: ScheduleModule): boolean {
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

    openLink(): void {
        if ($('.schedule-items li.active').length) {
            const href = $('.schedule-items li.active').data('href');
            const win = window.open(href, '_blank');
            win.focus();
        }
    }

    registerKeyboardInputs(): void {
        const self = this;

        const upParams = {key: 'schedule.prev', title: 'برنامه قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            // Prev Program
            self.setActive('prev');
        });

        const downParams = {key: 'schedule.next', title: 'برنامه بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            // Next Program
            self.setActive('next');
        });

        const leftParams = {key: 'schedule.left', title: 'روز قبل', icon: 'right', button: true};
        this.input.addEvent('left', false, leftParams, () => {
            // Prev Day
            self.currentDate = self.currentDate.add(1, 'd');
            self.load(self.currentDate);
        });

        const rightParams = {key: 'schedule.right', title: 'روز بعد', icon: 'left', button: true};
        this.input.addEvent('right', false, rightParams, () => {
            // Next Day
            self.currentDate = self.currentDate.subtract(1, 'd');
            self.load(self.currentDate);
        });

        const enterParams = {key: 'schedule.enter', title: 'اطلاعات برنامه', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            // Open Link
            self.openLink();
        });
    }
}
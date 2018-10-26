import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import {ScheduleService} from "../../_services/schedule.service";
import {Schedules} from "../../_models/schedule.model";

export default class ScheduleModule {

    private service;
    private input;
    private template;
    private $el = $('#content');
    private currentDate = moment();

    constructor() {
        this.template = TemplateHelper.Instance;
        this.input = Inputs.Instance;
        this.service = ScheduleService.Instance;
        const self = this;

        this.registerKeyboardInputs();
        this.load(this.currentDate, (c) => {
            // self.registerEvents();
        });

        return this;
    }

    loading(start: boolean = true): void {
        const method = start ? 'addClass' : 'removeClass';
        $('#app')[method]('loading');
    }

    load(date, callback?: any) {
        const self = this;
        this.loading();
        this.service.getDate(date.format('YYYY-MM-DD')).done((data: Schedules) => {
            // End loading
            self.loading(false);
            self.render(data, (data: Schedules) => {
                $('.schedule-items').animate({'scrollTop': 0}, 1);
                if ($('.schedule-items li.current').length) {
                    setTimeout(() => {
                        $('.schedule-items').animate({
                            scrollTop: $('.schedule-items li.current').offset().top
                        }, 500);
                    }, 500);
                } else {
                    $('.schedule-items li').first().addClass('active');
                }
            });
        });
    }

    findCurrent(list: Schedules) {
        const today = moment();
        if (this.currentDate === today.format('YYYY-MM-DD')) {
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
            list[currentIndex]['current'] = true;
        } else {
            // list[0]['current'] = true;
        }
        return list;
    }

    render(data: Schedules, callback) {
        const self = this;
        const templatePromise = this.template.load('modules', 'schedule');
        data = self.findCurrent(data);
        this.template.render(templatePromise, data, this.$el, 'html', function () {
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
        return true;
    }

    setActive(which: string) {
        const $current = $('.schedule-items li.active');
        if (which === 'next') {
            if ($current.next().length)
                $current.removeClass('active') && $current.next().addClass('active');
        } else {
            if ($current.prev().length)
                $current.removeClass('active') && $current.prev().addClass('active');
        }
        const $activeElement = $('.schedule-items li.active');
        $('.schedule-items').animate({
            scrollTop: $activeElement.position().top + $('.schedule-items').scrollTop() - 100
        }, 500);
    }

    registerKeyboardInputs() {
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
    }
}
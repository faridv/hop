import {ApiHelper} from './api.helper';
import {httpHelper} from './http.helper';
import * as moment from 'moment-jalaali';
import jqXHR = JQuery.jqXHR;

declare let window: any;

export default class ClockHelper {

    config;
    clockTimer: number;
    $el;

    constructor(config, $container) {
        this.config = config;
        this.$el = $container;

        this.initClock();

        window.clearInterval(window.clockUpdateInterval);
        window.clockUpdateInterval = setInterval(() => {
            this.initClock();
        }, config.clockUpdateInterval);
    }

    initClock(): void {
        const self = this;
        this.getClock().done((data: any) => {
            self.processDate(data.clock);
        });
    }

    getClock(): jqXHR {
        return httpHelper.get(ApiHelper.get('clock'), {tz: this.config.timezone});
    }

    render(formattedClock): void {
        this.$el.text(formattedClock);
    }

    processDate(dateTime: string): void {
        moment.locale(this.config.locale);
        // to fix response latency
        const serverDate = (moment(dateTime).isValid()) ? moment(dateTime).add(1, 'seconds') : moment();
        this.render(serverDate.format('HH:mm:ss'));
        this.updateTime(serverDate);
    }

    updateTime(formattedClock): void {
        const self = this;
        clearInterval(this.clockTimer);
        window.clearInterval(window.clockTimerInterval);
        window.clockTimerInterval = this.clockTimer = <any>setInterval(() => {
            formattedClock.add(1, 'seconds');
            self.render(formattedClock.format('HH:mm:ss'));
        }, 1000);
    }
}
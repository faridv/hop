import { ApiHelper } from './api.helper';
import { HttpHelper } from './http.helper';
import * as moment from 'moment-jalaali';
import { IConfig } from '../_models/config.model';
import jqXHR = JQuery.jqXHR;

declare let window: any;

export default class ClockHelper {

    private config: IConfig;
    private clockTimer: number;
    private $el: JQuery;

    constructor(config, $container) {
        this.config = config;
        this.$el = $container;

        this.initClock();

        window.clearInterval(window.clockUpdateInterval);
        window.clockUpdateInterval = setInterval(() => {
            this.initClock();
        }, config.clockUpdateInterval);
    }

    private initClock(): void {
        const self = this;
        this.getClock().done((data: any) => {
            self.processDate(data.clock);
        });
    }

    private getClock(): jqXHR {
        return HttpHelper.get(ApiHelper.get('clock'), { tz: this.config.timezone });
    }

    private render(formattedClock): void {
        this.$el.text(formattedClock);
    }

    private processDate(dateTime: string): void {
        window.SERVER_TIME = dateTime;
        moment.locale(this.config.locale);
        // to fix response latency
        const serverDate = (moment(dateTime).isValid()) ? moment(dateTime).add(1, 'seconds') : moment();
        this.render(serverDate.format('HH:mm:ss'));
        this.updateTime(serverDate);
    }

    private updateTime(formattedClock): void {
        const self = this;
        clearInterval(this.clockTimer);
        window.clearInterval(window.clockTimerInterval);
        window.clockTimerInterval = this.clockTimer = <any>setInterval(() => {
            formattedClock.add(1, 'seconds');
            self.render(formattedClock.format('HH:mm:ss'));
            window.SERVER_TIME = formattedClock.locale('en').format('YYYY-MM-DD HH:mm:ss');
        }, 1000);
    }
}

import * as moment from 'moment-jalaali';
import * as $ from 'jquery';
import jqXHR = JQuery.jqXHR;

declare let window: any;

export default class ClockHelper {

    locale: string;
    clockTimer: number;
    updateInterval: number;
    $el;


    constructor(config, $container) {
        this.updateInterval = config.clockUpdateInterval;
        this.locale = config.locale;
        this.$el = $container;

        this.initClock();

        window.clearInterval(window.clockUpdateInterval);
        window.clockUpdateInterval = setInterval(() => {
            this.initClock();
        }, this.updateInterval);
    }

    initClock(): void {
        const self = this;
        $.when(this.getClock()).then(
            function (data, textStatus, request) {
                self.processDate(request.getResponseHeader('Date'));
            },
            function (xmlhttprequest, textstatus, message) {
                self.processDate(xmlhttprequest.getResponseHeader('Date'));
            }
        );
    }

    getClock(): jqXHR {
        return $.ajax({
            type: 'HEAD',
            url: ''
        });
    }

    render(formattedClock): void {
        this.$el.text(formattedClock);
    }

    processDate(dateTime): void {
        moment.locale(this.locale);
        // to fix response latency
        // const serverDate = (moment(dateTime).isValid()) ? moment(dateTime).utcOffset(3.5).add(1, 'seconds') : moment();
        const serverDate = (moment(dateTime).isValid()) ? moment(dateTime).utcOffset(
            moment(dateTime).isDST() ? '4.5' : '3.5'
        ) : moment();
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
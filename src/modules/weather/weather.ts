import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import {Schedules} from "../../_models/schedule.model";
import {WeatherService} from "./weather.service";
import Store from "../../_utilities/storage.utility";
import {WeatherCodesHelper} from "./weather-codes.helper";

export default class WeatherModule {

    private store;
    private service;
    private input;
    private template;
    private coordinations;
    private $el = $('#content');
    private currentDate = moment();

    constructor() {
        this.store = Store;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = WeatherService.instance;
        const self = this;

        // this.registerKeyboardInputs();
        this.coordinations = this.store.get('location') ? this.store.get('location').coordinations : [35.6961, 51.4231]; // Tehran
        // Load weather template
        this.render({location: this.coordinations.join(',')}, () => {
            self.registerEvents();
            this.load(this.coordinations);
        });

        return this;
    }

    loading(start: boolean = true): void {
        const method = start ? 'addClass' : 'removeClass';
        $('#app')[method]('loading');
    }

    load(coordinations, callback?: any) {
        const self = this;
        this.loading();
        // TODO
        this.service.getCity(coordinations.toString()).done((data) => {
            // End loading
            self.loading(false);
            data = self.prepareData(data);
            self.renderDetails(data, (data: any) => {

            });
        });
    }

    prepareData(data) {
        let i: number = 0;
        let weather: any = data.query.results.channel;
        const statusCode = ~~weather.item.condition.code;
        weather['status'] = WeatherCodesHelper.resolveCode(statusCode);
        weather['icon'] = WeatherCodesHelper.resolveIcon(statusCode);
        weather.item.forecast = weather.item.forecast.slice(0, 5);
        weather.item.forecast.forEach((forecast) => {
            const forecastCode = ~~forecast.code;
            const momentDate = moment(forecast.date, 'DD MMM YYYY');
            forecast['status'] = WeatherCodesHelper.resolveCode(forecastCode);
            forecast['icon'] = WeatherCodesHelper.resolveIcon(forecastCode);
            forecast['fdate'] = momentDate.isSame(moment(), 'day') ? 'امشب' : momentDate.format('jM/jD');
        });
        return weather;
    }

    render(data, callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'weather');
        this.template.render(templatePromise, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    renderDetails(data, callback): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'weather-details');
        this.template.render(templatePromise, data, $('#weather-details'), 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: WeatherModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', {key: 'location.prev'});
        self.input.removeEvent('down', {key: 'location.next'});
        return true;
    }

    registerEvents() {
        const self = this;
        const $locationSelect = $('#location-select');
        this.registerKeyboardInputs($locationSelect);
        $locationSelect.on('change', function (e) {
            const $select = $(e.target);
            const location = {
                coordinations: $select.val().toString().split(','),
                city: $select.find('option:selected').text()
            };
            self.store.set('location', location);
            self.load(location.coordinations);
        });
        $locationSelect.focus();
    }

    registerKeyboardInputs($select): void {
        const self = this;

        const upParams = {key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            if (!$('#app').hasClass('loading')) {
                if ($select.find('option:selected').prev().is('option')) {
                    let $current = $select.find('option:selected');
                    $current.prev().prop('selected', 'selected');
                    $current.removeProp('selected');
                    $select.trigger('change');
                }
            }
        });

        const downParams = {key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            if (!$('#app').hasClass('loading')) {
                if ($select.find('option:selected').next().is('option')) {
                    let $current = $select.find('option:selected');
                    $current.next().prop('selected', 'selected');
                    $current.removeProp('selected');
                    $select.trigger('change');
                }
            }
        });
    }
}
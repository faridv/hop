import * as moment from 'moment-jalaali';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import { WeatherService } from "./weather.service";
import Store from "../../_utilities/storage.utility";
import template from './weather.html';
import detailsTemplate from './weather-details.html';
import { Module } from '../../libs';

export default class WeatherModule extends Module {

    protected store;
    protected service;
    protected input;
    protected template;
    protected $el = $('#content');
    private coordination;
    private currentDate = moment();

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        this.store = Store;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = WeatherService.instance;
        const self = this;

        this.coordination = this.store.get('location') && typeof this.store.get('location').coordination !== 'undefined'
            ? this.store.get('location').coordination
            : [35.7, 51.42]; // Tehran

        // Load weather templateHelper
        this.render({ location: this.coordination.join(',') }, () => {
            self.registerEvents();
            this.load(this.coordination);
        });

        return this;
    }

    public load(coordination, callback?: any): void {
        const self = this;
        this.template.loading();
        this.service.getCity(coordination.toString()).done((data) => {
            // End loading
            self.template.loading(false);
            data = self.prepareData(data.data);
            self.renderDetails(data);
        });
    }

    public prepareData(data) {
        let weather: any = data;
        moment.locale('en');
        moment.loadPersian({ dialect: 'persian-modern' });
        weather.forecast = weather.forecast.slice(0, 5);
        weather.forecast.forEach((forecast) => {
            const momentDate = moment(forecast.date.toString().split(' ')[0], 'YYYY-MM-DD ', false);
            forecast['fdate'] = momentDate.isSame(moment(), 'day') ? 'امشب' : momentDate.format('dddd jM/jD');
        });
        return weather;
    }

    render(data, callback): void {
        this.template.render(template, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    renderDetails(data, callback?): void {
        this.template.render(detailsTemplate, data, $('#weather-details'), 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: WeatherModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', { key: 'location.prev' });
        self.input.removeEvent('down', { key: 'location.next' });
        return true;
    }

    registerEvents() {
        const self = this;
        const $locationSelect = $('#location-select');
        this.registerKeyboardInputs($locationSelect);
        $locationSelect.on('change', function (e) {
            const $select = $(e.target);
            const location = {
                coordination: $select.val().toString().split(','),
                city: $select.find('option:selected').text()
            };
            self.store.set('location', location);
            self.load(location.coordination);
        });
        $locationSelect.focus();
    }

    registerKeyboardInputs($select): void {
        const self = this;

        const upParams = { key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true };
        this.input.addEvent('up', false, upParams, () => {
            if (!self.template.hasClass('loading', '#app')) {
                // if (!$('#app').hasClass('loading')) {
                if ($select.find('option:selected').prev().is('option')) {
                    let $current = $select.find('option:selected');
                    $current.prev().prop('selected', 'selected');
                    $current.removeProp('selected');
                    $select.trigger('change');
                }
            }
        });

        const downParams = { key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true };
        this.input.addEvent('down', false, downParams, () => {
            if (!self.template.hasClass('loading', '#app')) {
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

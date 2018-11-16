import Store from "../../_utilities/storage.utility";
import * as PrayerTimes from 'prayer-times';
import * as $ from 'jquery';
import {Prayers} from "../../_models/prayers.model";
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";

// declare let PrayerTimes: any;

export default class PrayerTimesModule {

    private store;
    private coordinations;
    private template;
    private prayTimes;
    private input;
    private $el = $('#content');

    constructor(config?) {

        this.store = Store;
        this.template = TemplateHelper.instance;
        this.prayTimes = new PrayerTimes();
        this.prayTimes.setMethod('Tehran');
        this.input = Inputs.instance;

        const self = this;

        this.coordinations = this.store.get('location') ? this.store.get('location').coordinations : [35.6961, 51.4231]; // Tehran
        this.showPrayers(this.coordinations, (prayerTimes) => {
            self.registerEvents();
        });

        return this;
    }


    destroy (instance?: PrayerTimesModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        $('#location-select').off('change');
        // for (let i:number = 0; i < self.events.length; i++) {
        //     self.input.off(self.events[i]['key'], self.events);
        // }
        // self.events = [];
        self.input.removeEvent('up', {key: 'location.prev'});
        self.input.removeEvent('down', {key: 'location.next'});

        return true;
    }

    registerEvents() {
        const self = this;
        const $locationSelect = $('#location-select');
        this.registerKeyboardInputs($locationSelect);
        $locationSelect.on('change', function(e) {
            const $select = $(e.target);
            const location = {
                coordinations: $select.val().toString().split(','),
                city: $select.find('option:selected').text()
            };
            self.store.set('location', location);
            self.updateValues(location.coordinations);
        });
        $locationSelect.focus();
    }

    registerKeyboardInputs($select) {
        const self = this;

        const upParams = {key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            if ($select.find('option:selected').prev().is('option')) {
                let $current = $select.find('option:selected');
                $current.prev().prop('selected', 'selected');
                $current.removeProp('selected');
                $select.trigger('change');
            }
        });

        const downParams = {key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            if ($select.find('option:selected').next().is('option')) {
                let $current = $select.find('option:selected');
                $current.next().prop('selected', 'selected');
                $current.removeProp('selected');
                $select.trigger('change');
            }
        });
    }

    showPrayers(coordinations, callback) {
        const templatePromise = this.template.load('modules', 'prayer-times');
        const data = {prayers: this.getPrayers(coordinations), location: coordinations.join(',')};
        this.template.render(templatePromise, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    getPrayers(coordinations): Prayers {
        return this.prayTimes.getTimes(new Date(), coordinations, 3.5, 'auto', '24h');
    }

    updateValues(coordinations) {
        const times: Prayers = this.getPrayers(coordinations);
        for (let timeTitle in times) {
            $('[data-type="' + timeTitle + '"] .time').text(times[timeTitle]);
        }
    }

}
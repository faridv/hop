import * as PrayerTimes from 'prayer-times';
import * as $ from 'jquery';
import {Prayers} from "./prayers.model";
import {Module} from '../../libs/module';

// declare let PrayerTimes: any;

export default class PrayerTimesModule extends Module {
    
    private prayTimes;
    private coordinations;
    protected template = './prayer-times.template.html';
    protected events = {
        'location.prev': {'control': 'up', key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true},
        'location.next': {'control': 'down', key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true},
    };

    constructor(config?, layoutInstance?) {
        super(config, layoutInstance);
        this.prayTimes = new PrayerTimes();
        this.prayTimes.setMethod('Tehran');
        this.events = this.prepareControls();

        const self = this;

        this.coordinations = this.store.get('location') ? this.store.get('location').coordinations : [35.6961, 51.4231]; // Tehran
        this.showPrayers(this.coordinations, (prayerTimes) => {
            self.registerEvents();
        });

        return this;
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

        this.input.addEvent('up', false, this.events['location.prev'], () => {
            self.changeCity($select, 'prev');
        });

        this.input.addEvent('down', false, this.events['location.next'], () => {
            self.changeCity($select, 'next');
        });
    }

    changeCity($select, dir): void {
        if ($select.find('option:selected')[dir]().is('option')) {
            let $current = $select.find('option:selected');
            $current[dir]().prop('selected', 'selected');
            $current.removeProp('selected');
            $select.trigger('change');
        }
    }

    showPrayers(coordinations, callback) {
        const template = require(`${this.template}`);
        const data = {prayers: this.getPrayers(coordinations), location: coordinations.join(',')};
        this.templateHelper.render(template, data, this.$el, 'html', function () {
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
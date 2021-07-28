import * as PrayerTimes from 'prayer-times';
import * as $ from 'jquery';
import { Prayers } from "./prayers.model";
import { Module } from '../../libs';
import template from './prayer-times.template.html';
import { IConfig } from '../../_models/config.model';

export default class PrayerTimesModule extends Module {

    private prayTimes;
    readonly coordination;

    protected events = {
        'location.prev': { 'control': 'up', key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true },
        'location.next': { 'control': 'down', key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true },
    };

    constructor(config?: IConfig, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.prayTimes = new PrayerTimes();
        this.prayTimes.setMethod('Tehran');
        this.events = this.prepareControls();

        const self = this;

        this.coordination = this.store.get('location') ? this.store.get('location').coordination : [35.7, 51.42]; // Tehran
        this.render(this.coordination, () => {
            self.registerEvents();
        });

        return this;
    }

    private registerEvents() {
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
            self.updateValues(location.coordination);
        });
        $locationSelect.focus();
    }

    private registerKeyboardInputs($select) {
        const self = this;

        this.input.addEvent('up', false, this.events['location.prev'], () => {
            self.changeCity($select, 'prev');
        });

        this.input.addEvent('down', false, this.events['location.next'], () => {
            self.changeCity($select, 'next');
        });
    }

    private changeCity($select, dir): void {
        const $selectedOption = $select.find('option:selected');
        if ($selectedOption[dir]().is('option')) {
            $selectedOption[dir]().prop('selected', 'selected');
            $selectedOption.removeProp('selected');
            $select.trigger('change');
        }
    }

    public render(coordination, callback): void {
        const data = { prayers: this.getPrayers(coordination), location: coordination.join(',') };
        this.templateHelper.render(template, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    private getPrayers(coordination): Prayers {
        return this.prayTimes.getTimes(new Date(), coordination, 3.5, 'auto', '24h');
    }

    private updateValues(coordination) {
        const times: Prayers = this.getPrayers(coordination);
        for (let timeTitle in times) {
            if (times.hasOwnProperty(timeTitle)) {
                $('[data-type="' + timeTitle + '"] .time').text(times[timeTitle]);
            }
        }
    }

}

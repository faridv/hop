import * as $ from 'jquery';
import { IslamicPrayer } from "./prayers.model";
import { Module } from '../../libs';
import template from './prayer-times.template.html';
import { IConfig, ILocation } from '../../_models/config.model';
import { PrayerTimesService } from './prayer-times.service';

export default class PrayerTimesModule extends Module {

    public prayTimes: { [key: string]: IslamicPrayer };
    protected readonly coordination;
    private locations: ILocation[];

    protected events = {
        'location.prev': { 'control': 'up', key: 'location.prev', title: 'شهر قبلی', icon: 'up', button: true },
        'location.next': { 'control': 'down', key: 'location.next', title: 'شهر بعدی', icon: 'bottom', button: true },
    };

    constructor(config?: IConfig, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        this.service = PrayerTimesService.instance;
        this.events = this.prepareControls();
        this.locations = this.config.locations;
        this.load();

        return this;
    }

    public load(): void {
        const locationList: string[] = [];
        this.locations.forEach(location => locationList.push(location.coords.join(',')));
        this.service.getTimes(locationList.join(';'))
            .done((response: { [key: string]: IslamicPrayer }) => {
                this.prayTimes = response;
                this.render();
            });
    }

    private registerEvents(): void {
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

    private registerKeyboardInputs($select): void {
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

    public render(defaultCity = this.getDefaultLocation()): void {
        const data = {
            prayers: this.getTimesByCoords(),
            location: this.getCityByCoords(),
        };
        this.templateHelper.render(template, data, this.$el, 'html', () => {
            this.registerEvents();
        });
    }

    private getDefaultLocation(): string {
        return this.store.get('location') && typeof this.store.get('location').coordination !== 'undefined'
            ? this.store.get('location').coordination.join(',')
            : '51.42,35.7'; // Tehran
    }

    private getCityByCoords(coords: string = this.getDefaultLocation()): any {
        return this.locations.find(location => {
            if (location.coords.join(',') === coords) {
                return location;
            }
        })?.coords.join(',');
    }

    private getTimesByCoords(coords: string = this.getDefaultLocation()): IslamicPrayer {
        return this.prayTimes[Object.keys(this.prayTimes).find(key => key === coords)];
    }

    private updateValues(coordination) {
        const times: IslamicPrayer = this.getTimesByCoords(coordination.join(','));
        for (let timeTitle in times) {
            if (times.hasOwnProperty(timeTitle)) {
                $('[data-type="' + timeTitle + '"] .time').text(times[timeTitle]);
            }
        }
    }

}

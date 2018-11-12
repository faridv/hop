import * as $ from 'jquery';
import * as toastr from 'toastr';
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import CarouselLayout from "./layouts/carousel.layout";
import GridLayout from "./layouts/grid.layout";

import PrayerTimesModule from '../modules/prayer-times/prayer-times.module';
import ScheduleModule from "../modules/schedule/schedule.module";
import GamesModule from "../modules/games/games.module";
import WeatherModule from "../modules/weather/weather.module";
import ClockHelper from "../_helpers/clock.helper";
import ConnectionHelper from "../_helpers/connection.helper";
import ScreenLayout from "./layouts/screen.layout";
import StreamModule from "../modules/stream/stream.module";
import InfoModule from "../modules/info/info.module";

export default class Layouts {

    public layout: string;
    public config;
    public appData;
    private template;
    private input;
    private cachedFooterElements: string;

    constructor(layout: string = 'carousel', Config, appData) {

        this.buttonsChangeListener();

        this.layout = layout;
        this.config = Config;
        this.appData = appData;
        this.input = Inputs.instance;
        this.template = TemplateHelper.instance;


        try {
            this[this.layout]();
            this.renderFooter();
        } catch (e) {
            throw e;
        }
    }

    private buttonsChangeListener(): void {
        const self = this;
        // $('body').on('event-change', (e) => {
        //     self.updateFooter();
        // });
        setInterval(() => {
            self.updateFooter();
        }, 500);
    }

    private carousel(): void {
        CarouselLayout.init(this.config, this.appData, this);
    }

    private grid(): void {
        GridLayout.init(this.config, this.appData);
    }

    private screen(): void {
        ScreenLayout.init(this.config, this.appData, this);
    }

    private getFooterItems() {
        return this.input.getEventList(true);
    }

    private renderFooter(): void {
        let items = this.getFooterItems();
        if (JSON.stringify(items) !== this.cachedFooterElements) {
            const templatePromise = this.template.load('controls', 'footer');
            const $footer = $('#footer');
            this.template.render(templatePromise, items, $footer, 'html');
            this.cachedFooterElements = JSON.stringify(items);
        }
    }

    private updateFooter(): void {
        this.renderFooter();
    }

    public loadModule(moduleTitle: string, config: object = {}, skipUnload: boolean = false) {
        let module: any = null;
        switch (moduleTitle) {
            case 'prayer-times':
                module = PrayerTimesModule;
                break;
            case 'weather':
                module = WeatherModule;
                break;
            case 'schedule':
                module = ScheduleModule;
                break;
            case 'games':
                module = GamesModule;
                break;
            case 'stream':
                module = StreamModule;
                break;
            case 'info':
                module = InfoModule;
                break;
        }
        if (!module)
            return;

        const moduleInstance = new module(config);
        if (!skipUnload)
            this.prepareUnloadModule(moduleInstance);
    }

    private prepareUnloadModule(moduleInstance) {
        const exitParams = {key: 'module.exit', title: 'بازگشت به منو', icon: 'refresh', button: true};
        const self = this;
        this.input.addEvent('back', true, exitParams, () => {
            if (moduleInstance.destroy()) {
                this.cleanUpPage(() => {
                    self[this.layout]();
                });
            }
        });
    }

    private cleanUpPage(callback?) {
        $('#content').empty().promise().done(() => {
            if (typeof callback !== 'undefined')
                callback();
        });
    }

    // Helpers

    public renderClock(config, $el): void {
        new ClockHelper(config, $el);
    }

    public renderConnectionStatus(): void {
        new ConnectionHelper();
    }

}
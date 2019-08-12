import * as $ from 'jquery';
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
import ScheduleCarouselModule from '../modules/schedule-carousel/schedule-carousel.module';
import IKTVLayout from './layouts/iktv.layout';
import NewsModule from '../modules/news/news.module';
import ProgramModule from '../modules/program/program.module';
import MarketModule from '../modules/market/market.module';
import QuranModule from '../modules/quran/quran.module';

export default class Layouts {

    public layout: string;
    public config;
    public appData;
    private template;
    private input;
    private currentModuleInstance;
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

    private iktv(): void {
        IKTVLayout.init(this.config, this.appData, this);
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
        const self = this;
        let items = this.getFooterItems();
        if (JSON.stringify(items) !== this.cachedFooterElements) {
            const templatePromise = this.template.load('controls', 'footer');
            const $footer = $('#footer');
            this.template.render(templatePromise, {items: items}, $footer, 'html', () => {
                self.addFooterItemsClickListener();
            });
            this.cachedFooterElements = JSON.stringify(items);
        }
    }

    private addFooterItemsClickListener(): void {
        if (typeof window['footerClickable'] === 'undefined' || window['footerClickable'] === false) {
            const self = this;
            window['footerClickable'] = true;
            $(document).on('click', '.footer-items li', function (e: Event) {
                e.preventDefault();
                const key = $(this).attr('class').split(',')[0].charAt(0);
                const keyCode = key.toUpperCase().charCodeAt(0);

                self.doKeyPress(keyCode);
            });
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
            case 'schedule-carousel':
                module = ScheduleCarouselModule;
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
            case 'news':
                module = NewsModule;
                break;
            case 'vod':
                module = ProgramModule;
                break;
            case 'market':
                module = MarketModule;
                break;
            case 'quran':
                module = QuranModule;
                break;
        }
        if (!module)
            return;

        const moduleInstance = this.currentModuleInstance = new module(config, this);
        if (!skipUnload)
            this.prepareUnloadModule(moduleInstance);
    }

    public prepareUnloadModule(moduleInstance?) {
        const exitParams = {key: 'module.exit', title: 'بازگشت به فهرست', icon: 'refresh', button: true};
        const self = this;
        const module = typeof moduleInstance !== 'undefined' ? moduleInstance : this.currentModuleInstance;
        this.input.addEvent('back,backspace', true, exitParams, () => {
            if (module.destroy()) {
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

    /*
    * Helpers
    */
    public renderClock(config, $el): void {
        new ClockHelper(config, $el);
    }

    public renderConnectionStatus(): void {
        new ConnectionHelper();
    }

    // Dirty key-press simulator, just for handling footer items
    private doKeyPress(key) {
        let oEvent = document.createEvent('KeyboardEvent');
        Object.defineProperty(oEvent, 'keyCode', { // for Chrome based browser
            get: function () {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get: function () {
                return this.keyCodeVal;
            }
        });
        if (oEvent.initKeyboardEvent) {
            // @ts-ignore
            oEvent.initKeyboardEvent('keydown', true, true, document.defaultView, false, false, false, false, key);
        } else {
            // @ts-ignore
            oEvent.initKeyEvent('keydown', true, true, document.defaultView, false, false, false, false, key, 0);
        }

        // @ts-ignore
        oEvent.keyCodeVal = key;
        document.activeElement.dispatchEvent(oEvent);
    }

}
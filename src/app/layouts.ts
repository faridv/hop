import * as $ from 'jquery';
import * as toastr from 'toastr';
import CarouselLayout from "./layouts/carousel.layout";
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import GridLayout from "./layouts/grid.layout";

import PrayerTimesModule from '../modules/prayer-times/prayer-times';
import ScheduleModule from "../modules/schedule/schedule";

export default class Layouts {

    public mode;
    public config;
    public appData;
    private template;
    private input;

    constructor(mode: string = 'carousel', Config, appData) {

        this.buttonsChangeListener();

        this.mode = mode;
        this.config = Config;
        this.appData = appData;
        this.input = Inputs.Instance;
        this.template = TemplateHelper.Instance;

        try {
            this[mode]();
            this.renderFooter();
        } catch (e) {
            throw e;
        }
    }

    private buttonsChangeListener(): void {
        const self = this;
        $('body').on('event-change', (e) => {
            self.updateFooter();
        });
    }

    private carousel(): void {
        CarouselLayout.init(this.config, this.appData, this);
    }

    private grid(): void {
        GridLayout.init(this.config, this.appData);
    }

    private getFooterItems() {
        return this.input.getEventList(true);
    }

    private renderFooter(): void {
        let items = this.getFooterItems();
        const templatePromise = this.template.load('controls', 'footer');
        const $footer = $('#footer');
        this.template.render(templatePromise, items, $footer, 'html');
    }

    private updateFooter(): void {
        this.renderFooter();
    }

    public loadModule(moduleTitle: string) {
        let module: any = null;
        switch (moduleTitle) {
            case 'prayer-times':
                module = PrayerTimesModule;
                break;
            case 'schedule':
                module = ScheduleModule;
                break;
        }
        if (!module)
            return;

        const moduleInstance = new module();
        this.prepareUnloadModule(moduleInstance);
    }

    private prepareUnloadModule(moduleInstance) {
        const exitParams = {key: 'module.exit', title: 'بازگشت به منو', icon: 'refresh', button: true};
        const self = this;
        this.input.addEvent('backspace', true, exitParams, () => {
            if (moduleInstance.destroy()) {
                this.cleanUpPage(() => {
                    self[this.mode]();
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

}
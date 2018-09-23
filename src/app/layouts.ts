import * as $ from 'jquery';
import CarouselLayout from "./layouts/carousel.layout";
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import GridLayout from "./layouts/grid.layout";

export default class Layouts {

    public config;
    public appData;
    private template;
    private input;

    constructor(mode: string = 'carousel', Config, appData) {

        this.buttonsChangeListener();

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

    public loadModule() {
        console.log('loading module requested');
    }

}
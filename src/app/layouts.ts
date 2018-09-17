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
        this.config = Config;
        this.appData = appData;
        this.input = Inputs.Instance;
        this.template = TemplateHelper.Instance;

        this.buttonsChangeListener();

        try {
            this[mode]();
            this.renderFooter();
        } catch (e) {
            throw e;
        }

    }

    buttonsChangeListener() {
        const self = this;
        $('body').on('event-change', (e) => {
            self.updateFooter();
        });
    }

    carousel(): void {
        CarouselLayout.init(this.config, this.appData);
    }

    grid() {
        GridLayout.init(this.config, this.appData);
    }

    getFooterItems() {
        return this.input.getEventList(true);
    }

    renderFooter() {
        const items = this.getFooterItems();
        const templatePromise = this.template.load('controls', 'footer');
        const $footer = $('#footer');
        this.template.render(templatePromise, items, $footer, 'html');
    }

    updateFooter() {
        this.renderFooter();
    }
}
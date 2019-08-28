import * as $ from 'jquery';
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import CarouselLayout from "./layouts/carousel.layout";
import GridLayout from "./layouts/grid.layout";
import ClockHelper from "../_helpers/clock.helper";
import ConnectionHelper from "../_helpers/connection.helper";
import ScreenLayout from "./layouts/screen.layout";
import IKTVLayout from './layouts/iktv.layout';

export default class Layouts {

    public layout: string;
    public config;
    public appData;
    private template;
    private input;
    private currentModuleInstance;
    private cachedFooterElements: string;
    private footerTemplate = `<ul class="footer-items">
    {{#each items}}
    <li data-scope="{{key}}" class="{{eventKey}}">
        <i class="icon-{{#if icon}}{{icon}}{{else}}square{{/if}}"></i>
        {{title}}
    </li>
    {{/each}}
</ul>`;

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
            const template = this.footerTemplate;
            const $footer = $('#footer');
            this.template.render(template, {items: items}, $footer, 'html', () => {
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

    public loadModule(moduleType: string, config: object = {}, skipUnload: boolean = false) {
        let module: any = null;
        this.appData.modules.forEach((item) => {
            if (typeof item !== 'undefined') {
                if (item.type === moduleType)
                    module = item._constructor;
            }
        });
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
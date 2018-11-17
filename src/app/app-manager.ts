import * as $ from "jquery";
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import Layouts from "./layouts";
import Bootstrap from "./bootstrap";

export default class AppManager {

    private config;
    private input;
    private container: string;
    private $el;
    private template;
    private _bootstrapInstance: Bootstrap;

    constructor(appData, Config, BootstrapInstance: Bootstrap) {
        this.config = Config;
        this.input = Inputs.instance;
        this.template = TemplateHelper.instance;
        this.container = Config.container;
        this._bootstrapInstance = BootstrapInstance;
        const self = this;
        $(function () {
            self.$el = $(self.container);
            self.showButton(appData);
        });
    }

    showButton(appData): boolean {
        const self = this;

        if (this.config.autostart) {
            self.initializeApplication(appData);
            return true;
        }

        const controlType = (appData.hasHub) ? 'button' : appData.layout;
        const templatePromise = this.template.load('controls', controlType);
        const button = appData.button;
        this.template.render(templatePromise, appData, this.$el, 'append', function (element) {

            // Show button after intentional delay time
            setTimeout(() => {

                $(element).find('[class*="button-"]').addClass('show');

                // Add application initialization key event
                const inputParams = {key: 'app.' + button.key, title: 'init'};
                self.input.addEvent(button.key, true, inputParams, function () {
                    self.initializeApplication(appData);
                });
                const inputParams2 = {key: 'app.' + 'r', title: 'init'};
                self.input.addEvent('r', true, inputParams2, function () {
                    self.initializeApplication(appData);
                });

                // Hide button after the configured time
                setTimeout(() => {
                    if ($(element).find('.show[class*="button-"]').length) {
                        $(element).find('[class*="button-"]').removeClass('show');
                    }
                }, self.config.timeout);
            }, self.config.delay);
        });
    }

    initializeApplication(appData) {
        const self = this;
        const layout = appData.layout;
        const templatePromise = this.template.load('layouts', layout);
        const modules = appData.modules;

        this._bootstrapInstance.setKeySet(0x1 + 0x2 + 0x4 + 0x8 + 0x10 + 0x20 + 0x40 + 0x80); // All Keys

        this.template.render(templatePromise, modules, this.$el, 'html', function () {
            self.template.addClass('active');

            // Should be on body
            self.template.addClass('layout-' + layout, 'body');

            const inputParams = {key: 'app.close', title: 'خروج', button: true};
            self.input.addEvent(appData.button.key, true, inputParams, function () {
                self.template.removeClassIfContains('body', 'layout-')
                self._bootstrapInstance.destroy(layout);
            });
            new Layouts(layout, self.config, appData);
        });
    }
}
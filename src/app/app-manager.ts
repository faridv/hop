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

    constructor (appData, Config, BootstrapInstance: Bootstrap) {
        this.config = Config;
        this.input = Inputs.instance;
        this.template = TemplateHelper.instance;
        this.container = Config.container;
        this._bootstrapInstance = BootstrapInstance;
        const self = this;
        $(function() {
            self.$el = $(self.container);
            self.showButton(appData);
        });
    }

    showButton(appData) {
        const self = this;
        const controlType = (appData.hasHub) ? 'button' : appData.layout;
        const templatePromise = this.template.load('controls', controlType);
        const button = appData.button;
        this.template.render(templatePromise, appData, this.$el, 'append', function(element) {
            const inputParams = {key: 'app.' + button.key, title: 'init'};
            self.input.addEvent(button.key, true, inputParams, function() {
                self.initializeApplication(appData);
            });

            setTimeout(() => {
                $(element).find('[class*="button-"]').addClass('show');
            }, self.config.timeout);
        });
    }

    initializeApplication(appData) {
        const self = this;
        const layout = appData.layout;
        const templatePromise = this.template.load('layouts', layout);
        const modules = appData.modules;

        this.template.render(templatePromise, modules, this.$el, 'html', function() {
            self.template.addClass('active');

            // Should be on body
            self.template.addClass('layout-' + layout, 'body');

            const inputParams = {key: 'app.close', title: 'خروج', button: true};
            self.input.addEvent(appData.button.key, true, inputParams, function() {
                self.template.removeClassIfContains('body', 'layout-')
                self._bootstrapInstance.destroy(layout);
            });
            new Layouts(layout, self.config, appData);
        });
    }
}
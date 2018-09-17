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
        this.input = Inputs.Instance;
        this.template = TemplateHelper.Instance;
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
        const templatePromise = this.template.load('controls', 'button');
        const button = appData.button;
        this.template.render(templatePromise, button, this.$el, 'append', function(element) {
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
        // TODO: load module data
        const modules = appData.modules;
        this.template.render(templatePromise, modules, this.$el, 'html', function() {
            self.template.addClass('active');
            self.template.addClass('layout-' + layout, self.config.container);
            // const layoutInstance = new Layouts(layout);
            new Layouts(layout, self.config, appData);

            const inputParams = {key: 'app.close', title: 'خروج', button: true};
            self.input.addEvent(appData.button.key, true, inputParams, function() {
                self._bootstrapInstance.destroy()
            });
        });
    }
}
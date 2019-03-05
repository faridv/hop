import Inputs from "../../app/inputs";
import TemplateHelper from "../../_helpers/template.helper";

export default class InfoModule {

    private input;
    private template;
    private $el = $('#content');
    private config;

    constructor(config: object = {}, layoutInstance?) {
        this.config = config;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;

        this.render(() => {

        });

        return this;
    }

    render(callback?): void {
        const self = this;
        const templatePromise = this.template.load('modules', 'info');
        this.template.render(templatePromise, {}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

    destroy(instance?: InfoModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        return true;
    }

}
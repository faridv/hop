import {Module} from '../../libs/module';

export default class InfoModule extends Module {

    template = './info.template.html';

    constructor(config: object = {}, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.render();
        return this;
    }

    render(callback?): void {
        const template = require(`${this.template}`);
        this.templateHelper.render(template, {}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

}

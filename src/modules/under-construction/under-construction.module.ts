import {Module} from '../../libs';

export default class UnderConstructionModule extends Module {

    template = './under-construction.template.html';

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

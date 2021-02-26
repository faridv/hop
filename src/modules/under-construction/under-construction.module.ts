import {Module} from '../../libs';
import template from './under-construction.template.html';

export default class UnderConstructionModule extends Module {

    constructor(config: object = {}, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.render();
        return this;
    }

    render(callback?): void {
        this.templateHelper.render(template, {}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

}

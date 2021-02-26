import {Module} from '../../libs/module';
import template from './about-channel.template.html';

export default class AboutChannelModule extends Module {

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

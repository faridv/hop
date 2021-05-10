import {Module} from '../../libs/module';
import template from './about-channel.template.html';
import { IConfig } from '../../_helpers';

export default class AboutChannelModule extends Module {

    constructor(config: IConfig, layoutInstance?, moduleType?: string) {
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

import { Module } from '../../libs';
import template from './info.template.html';
import { IConfig } from '../../_models/config.model';

export default class InfoModule extends Module {

    constructor(config: IConfig, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.render();
        return this;
    }

    public render(callback?): void {
        this.templateHelper.render(template, {}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

}

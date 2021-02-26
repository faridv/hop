import {Module} from '../../libs';
import {TehranAirService} from './tehran-air.service';
import template from './tehran-air.template.html';

export default class TehranAirModule extends Module {

    constructor(config: any = {}, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        this.service = TehranAirService.instance;

        this.render();
        return this;
    }

    render(callback?): void {
        const self = this;
        this.templateHelper.loading();
        let templateData: any = {};
        this.templateHelper.render(template, templateData, this.$el, 'html', () => {
            self.templateHelper.loading(false);
            if (typeof callback === 'function')
                callback();
        });
    }

}

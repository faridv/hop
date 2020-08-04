import {Module} from '../../libs/module';
import {TehranAirService} from './tehran-air.service';

export default class TehranAirModule extends Module {

    template = './tehran-air.template.html';

    constructor(config: any = {}, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);

        this.service = TehranAirService.instance;

        this.render();
        return this;
    }

    render(callback?): void {
        const self = this;
        const template = require(`${this.template}`);
        this.templateHelper.loading();
        let templateData: any = {};
        this.templateHelper.render(template, templateData, this.$el, 'html', () => {
            self.templateHelper.loading(false);
            if (typeof callback === 'function')
                callback();
        });
    }

}

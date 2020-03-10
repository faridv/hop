import {Module} from '../../libs/module';
import {TehranAirService} from './tehran-air.service';
import TemplateHelper from '../../_helpers/template.helper';

export default class TehranAirModule extends Module {

    template = './tehran-air.template.html';

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);

        this.service = TehranAirService.instance;

        this.render();
        return this;
    }

    render(callback?): void {
        const self = this;
        const template = require(`${this.template}`);
        this.templateHelper.loading();
        let templateData: any = {};
        // this.service.get('1').done((data1) => {
        //     templateData.data1 = data1.data;
        //     this.service.get('1').done((data2) => {
        //         templateData.data2 = data2.data;
        //         console.log(templateData);
        this.templateHelper.render(template, templateData, this.$el, 'html', function () {
            self.templateHelper.loading(false);
            if (typeof callback === 'function')
                callback();
        });
        //     });
        // });
    }

}
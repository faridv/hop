import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import {QuranService} from './quran.service';

export default class QuranModule {

    private service;
    private template;
    private input;
    private data;
    private $el = $('#content');

    constructor(config?, layoutInstance?) {
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = QuranService.instance;

        this.load();

        return this;
    }

    load(): void {
        const self = this;
        this.template.loading();
        this.service.getSurahList().done((data: any) => {
            // End loading
            self.data = data.data;
            self.template.loading(false);
            self.render(self.data, (data: any) => {
                // self.initializeSurahlistSlider();
            });
        });
    }

    render(data: any, callback): void {
        const self = this;
        const template = require('./quran.template.html');
        this.template.render(template, data, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    initializeSurahlistSlider() {
    }

}
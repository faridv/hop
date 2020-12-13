import {Module} from '../../libs/module';
import {Item} from '../../_models/item.model';
import {ItemsService} from '../../_services/items.service';

export default class FaqModule extends Module {

    private data = null;
    protected template = './faq.template.html';
    protected events = {
        'program.down': {'control': 'down', title: 'آیتم بعدی', icon: 'bottom'},
        'program.up': {'control': 'up', title: 'آیتم قبلی', icon: 'up'},
        'program.enter': {'control': 'enter', title: 'نمایش توضیحات', icon: 'enter'},
    };

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);
        this.service = ItemsService.instance;
        this.events = this.prepareControls();
        return this;
    }

    public render(items: Item[], callback?): void {
        const template = require(`${this.template}`);
        this.templateHelper.render(template, items, this.$el, 'html');
    }

    public load(callback?: any) {
        const self = this;
        this.templateHelper.loading();


    }

}

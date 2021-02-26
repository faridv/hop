import {Module} from '../../libs';
import {Item} from '../../_models/item.model';
import {FaqService} from './faq.service';
import {DefaultResponse} from '../../_models';
import * as $ from 'jquery';
import 'reflect-metadata';

import template from './faq.template.html';

export default class FaqModule extends Module {

    private data = null;
    protected events = {
        'faq.down': {'control': 'down', title: 'آیتم بعدی', icon: 'bottom'},
        'faq.up': {'control': 'up', title: 'آیتم قبلی', icon: 'up'},
        'faq.enter': {'control': 'enter', title: 'نمایش توضیحات', icon: 'enter'},
    };

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);
        this.service = FaqService.instance;
        this.events = this.prepareControls();
        this.load();
        return this;
    }

    public render(items: Item[], callback?): void {
        items = items.reverse();
        items[0].collapsed = true;
        this.templateHelper.render(template, items, this.$el, 'html', () => {
            this.registerKeyboardInputs();
        });
    }

    public load(callback?: any) {
        const self = this;
        this.service.getItemsByCategory(3).done((response: DefaultResponse) => {
            this.data = response;
            this.render(response.data, () => {
                self.templateHelper.loading();
            });
        });
    }

    private registerKeyboardInputs(): void {
        const $rows = $('.faq-items');
        this.input.addEvent('up', false, this.events['faq.up'], () => {
            const $currentActive = $rows.find('li.active');
            if ($currentActive.length && $currentActive.prev().is('li')) {
                $rows.find('li').removeClass('active');
                $currentActive.prev().addClass('active');
            }
        });
        this.input.addEvent('down', false, this.events['faq.down'], () => {
            const $currentActive = $rows.find('li.active');
            if ($currentActive.length && $currentActive.next().is('li')) {
                $rows.find('li').removeClass('active');
                $currentActive.next().addClass('active');
            }
        });
    }

}

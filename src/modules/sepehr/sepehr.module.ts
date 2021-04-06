import * as moment from 'moment-jalaali';
import { Module } from '../../libs';
import template from './sepehr.template.html';
import categoriesTemplate from './sepehr-categories.template.html';
import channelsTemplate from './sepehr-channels.template.html';
import epgTemplate from './sepehr-epg.template.html';
import { SepehrService } from './sepehr.service';

export default class SepehrModule extends Module {

    // temp
    tmp = [categoriesTemplate, channelsTemplate, epgTemplate];
    private readonly currentDate;
    protected events = {
        'sepehr-categories.prev': { 'control': 'right', title: 'قبلی', icon: 'right' },
        'sepehr-categories.next': { 'control': 'left', title: 'بعدی', icon: 'left' },
        'sepehr-categories.enter': { 'control': 'enter', title: 'انتخاب', icon: 'enter' },

        'sepehr-channels.prev': { 'control': 'up', title: 'قبلی', icon: 'up' },
        'sepehr-channels.next': { 'control': 'down', title: 'بعدی', icon: 'down' },
        // 'sepehr-channels.enter': {'control': 'enter', title: 'انتخاب', icon: 'enter'},

        'sepehr-live.enter': { 'control': 'blue', title: 'پخش زنده', icon: 'blue', button: true },
    };

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);

        moment.locale('en');
        this.currentDate = moment();
        this.service = SepehrService.instance;
        this.events = this.prepareControls();

        // this.loadCategories();
        this.render();


        return this;
    }

    loadCategories() {

    }

    render(callback?): void {
        this.templateHelper.render(template, {}, this.$el, 'html');
    }

}

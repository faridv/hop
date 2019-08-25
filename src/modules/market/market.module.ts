import {MarketService} from './market.service';
import {Market} from './market.model';
import {Module} from '../../libs/module';

export default class MarketModule extends Module {

    private data;
    protected template = {
        'markets': './market.template.html',
        'details': './market-details.template.html',
    };
    protected events = {
        'market.prev': {control: 'up', title: 'گروه قبلی', icon: 'up'},
        'market.next': {control: 'down', title: 'گروه بعدی', icon: 'bottom'},
        'market.enter': {control: 'enter', title: 'انتخاب گروه', icon: 'enter'},
        'market.more': {control: 'blue,b', title: 'ادامه'},
    };

    constructor(config?, layoutInstance?) {
        super(config, layoutInstance);
        this.service = MarketService.instance;
        this.events = this.prepareControls();
        this.load();
        return this;
    }

    load(callback?: any) {
        const self = this;
        this.templateHelper.loading();
        this.service.getLabels().done((data: any) => {
            self.data = data.data;
            self.render(self.data, (data: Market[]) => {
                this.loadDetails();
                this.registerKeyboardInputs();
                // End loading
                self.templateHelper.loading(false);
            });
        });
    }

    render(data: Market[], callback?): void {
        const template = require(`${this.template.markets}`);
        this.templateHelper.render(template, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    setActive(which: string): void {
        const $current = $('ul.market-items li.active');
        if (which === 'next') {
            if ($current.next('li').length) {
                this.templateHelper.addClass('active', $current.next('li'));
                this.templateHelper.removeClass('active', $current);
            }
        } else {
            if ($current.prev('li').length) {
                this.templateHelper.addClass('active', $current.prev('li'));
                this.templateHelper.removeClass('active', $current);
            }
        }
    }

    setCurrent($el: any = $('ul.market-items li.active')): void {
        this.templateHelper.removeClass('current', $('ul.market-items li'));
        this.templateHelper.addClass('current', $el);
        this.loadDetails($el);
    }

    registerKeyboardInputs(): void {
        const self = this;

        this.input.addEvent('up', false, this.events['market.prev'], () => {
            self.setActive('prev');
        });

        this.input.addEvent('down', false, this.events['market.next'], () => {
            self.setActive('next');
        });

        this.input.addEvent('enter', false, this.events['market.enter'], () => {
            self.setCurrent();
        });
        $(document).on('click', "ul.market-items li", (e) => {
            self.templateHelper.removeClass('active', $('ul.market-items li.active'));
            this.templateHelper.addClass('active', $(e.target));
            self.setCurrent($(e.target));
        });
    }

    loadDetails($item = $('ul.market-items li:first')): void {
        const self = this;
        const pid = $item.attr('data-id');
        this.templateHelper.loading();
        this.service.getData(pid).done((data: any) => {
            // Load item details
            const template = require(`${this.template['details']}`);
            const items = self.handleDetails(data.data);
            const reference = $('ul.market-items li.current').attr('data-ref');
            this.templateHelper.render(template, {items: items, reference: reference}, $('#market-details'), 'html', () => {
                //  End loading
                self.templateHelper.loading(false);
                if ($('#market-details').find('.page-2').length) {
                    this.input.addEvent('blue,b', false, self.events['market.more'], () => {
                        self.handleMore();
                    });
                } else {
                    self.input.removeEvent('blue,b', {key: 'market.more'});
                }
            });
        });
    }

    handleDetails(items: Market[]): Market[] {
        items.forEach((item, index) => {
            item.difference = ~~item.value - ~~item.lastValue;
            item.up = item.down = false;
            if (item.difference > 0) {
                item.up = true;
                item.difference = '+' + item.difference;
            }
            if (item.difference < 0) {
                item.down = true;
            }
        });
        items.forEach((item, index) => {
            item.difference = (typeof item.difference === 'undefined' || item.difference.length < 1) ? '0' : item.difference;
            item.page = (index < 24) ? 1 : 2;
        });
        return items;
    }

    handleMore(): void {
        if ($('.page-2').length) {
            if ($('.page-2:first').is(':visible')) {
                $('.page-2').hide(200, () => {
                    $('.page-1').show(200);
                });
            } else {
                $('.page-1').hide(200, () => {
                    $('.page-2').show(200);
                });
            }
        }
    }

}
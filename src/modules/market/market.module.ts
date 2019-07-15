import TemplateHelper from '../../_helpers/template.helper';
import Inputs from '../../app/inputs';
import Layouts from '../../app/layouts';
import {MarketService} from './market.service';
import {Market} from './market.model';

export default class MarketModule {

    private service;
    private input;
    private template;
    private config;
    private data;
    private layoutInstance: Layouts;
    private $el = $('#content');

    constructor(config?, layoutInstance?) {

        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.service = MarketService.instance;
        this.config = config;
        this.layoutInstance = layoutInstance;

        this.load();

        return this;
    }

    load(callback?: any) {
        const self = this;
        this.template.loading();
        this.service.getLabels().done((data: any) => {
            // End loading
            self.data = data.data;
            self.template.loading(false);
            self.render(self.data, (data: Market[]) => {
                // self.initializeSlider();
                this.loadDetails();
                this.registerKeyboardInputs($("ul.market-items"));
            });
        });
    }

    goToCurrent($carousel): void {
        const self = this;
        try {
            const $current = $carousel.find('li.current').parents('.slick-slide:first');
            $carousel.slick('slickGoTo', $current.attr('data-slick-index'), true);
        } catch (e) {
            setTimeout(() => {
                self.goToCurrent($carousel);
            }, 200);
            return;
        }
    }

    render(data: Market[], callback?): void {
        const templatePromise = this.template.load('modules', 'market');
        this.template.render(templatePromise, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    destroy(instance?: MarketModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', {key: 'market.prev'});
        self.input.removeEvent('down', {key: 'market.next'});
        self.input.removeEvent('left', {key: 'market.more'});
        self.input.removeEvent('enter', {key: 'market.enter'});
        return true;
    }

    setActive(which: string): void {
        const $current = $('ul.market-items li.active');
        if (which === 'next') {
            if ($current.next('li').length) {
                this.template.addClass('active', $current.next('li'));
                this.template.removeClass('active', $current);
            }
        } else {
            if ($current.prev('li').length) {
                this.template.addClass('active', $current.prev('li'));
                this.template.removeClass('active', $current);
            }
        }
    }

    setCurrent($el: any = $('ul.market-items li.active')): void {
        this.template.removeClass('current', $('ul.market-items li'));
        this.template.addClass('current', $el);
        this.loadDetails($el);
    }

    registerKeyboardInputs($carousel): void {
        const self = this;

        const upParams = {key: 'market.prev', title: 'گروه قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            self.setActive('prev');
        });

        const downParams = {key: 'market.next', title: 'گروه بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            self.setActive('next');
        });

        const enterParams = {key: 'market.enter', title: 'انتخاب گروه', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            self.setCurrent();
        });
        $(document).on('click', "ul.market-items li", (e) => {
            self.template.removeClass('active', $('ul.market-items li.active'));
            this.template.addClass('active', $(e.target));
            self.setCurrent($(e.target));
        });
    }

    loadDetails($item = $('ul.market-items li:first')): void {
        const self = this;
        const pid = $item.attr('data-id');
        this.template.loading();
        this.service.getData(pid).done((data: any) => {
            // End loading
            self.template.loading(false);
            // Load item details
            const templatePromise = this.template.load('modules', 'market-details');
            const items = self.handleDetails(data.data);
            const reference = $('ul.market-items li.current').attr('data-ref');
            this.template.render(templatePromise, {items: items, reference: reference}, $('#market-details'), 'html', () => {
                if ($('#market-details').find('.page-2').length) {
                    const leftParams = {key: 'market.more', title: 'ادامه', icon: 'left', button: true};
                    this.input.addEvent('left', false, leftParams, () => {
                        self.handleMore();
                    });
                } else {
                    self.input.removeEvent('left', {key: 'market.more'});
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
            // if (!item.State)
            //     items.splice(index, 1);
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
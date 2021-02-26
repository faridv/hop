import {MarketService} from './market.service';
import {Market} from './market.model';
import {Module} from '../../libs';
import marketsTemplate from './market.template.html';
import detailsTemplate from './market-details.template.html';

export default class MarketModule extends Module {

    private data;
    protected events = {
        'market.prev': {control: 'up', title: 'گروه قبلی', icon: 'up'},
        'market.next': {control: 'down', title: 'گروه بعدی', icon: 'bottom'},
        'market.enter': {control: 'enter', title: 'انتخاب گروه', icon: 'enter'},
        'market.more': {control: 'blue,b', title: 'ادامه'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.service = MarketService.instance;
        this.events = this.prepareControls();
        this.load();
        return this;
    }

    public load(callback?: any) {
        const self = this;
        this.templateHelper.loading();
        this.service.getLabels().done((data: any) => {
            self.data = data.data;
            self.render(self.data, ($carousel) => {
                this.loadDetails();
                this.registerKeyboardInputs($carousel);
                // End loading
                self.templateHelper.loading(false);
            });
        });
    }

    public render(data: Market[], callback?): void {
        this.templateHelper.render(marketsTemplate, {items: data}, this.$el, 'html', () => {
            const $verticalCarousel = $('.market-items');
            const itemsCount = $verticalCarousel.children().length - 1;
            $verticalCarousel.slick({
                slidesToShow: itemsCount < 14 ? itemsCount : 14,
                slidesToScroll: 1,
                vertical: true,
                centerMode: true,
                lazyLoad: 'ondemand',
            });
            if (typeof callback === 'function')
                callback($verticalCarousel);
        });
    }

    private setCurrent($el: any = $('ul.market-items .slick-current')): void {
        this.loadDetails($el);
    }

    private registerKeyboardInputs($carousel): void {
        const self = this;

        this.input.addEvent('up', false, this.events['market.prev'], () => {
            $carousel.slick('slickPrev');
        });

        this.input.addEvent('down', false, this.events['market.next'], () => {
            $carousel.slick('slickNext');
        });

        this.input.addEvent('enter', false, this.events['market.enter'], () => {
            self.setCurrent();
        });
        $(document).on('click', "ul.market-items .slick-slide", (e) => {
            self.setCurrent($(e.target));
        });
    }

    private loadDetails($item?: any): void {
        $item = typeof $item !== 'undefined' ? $item
            : $('ul.market-items .slick-current').length
                ? $('ul.market-items .slick-current')
                : $('ul.market-items li:first');
        const self = this;
        const $li = $item.is('li') ? $item : $item.find('li');
        const pid = $li.attr('data-id');

        this.templateHelper.loading();
        this.service.getData(pid).done((data: any) => {
            // Load item details
            const items = self.handleDetails(data.data);
            const reference = $li.attr('data-ref');
            this.templateHelper.render(detailsTemplate, {items: items, reference: reference}, $('#market-details'), 'html', () => {
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

    private handleDetails(items: Market[]): Market[] {
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

    private handleMore(): void {
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

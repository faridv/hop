import * as $ from 'jquery';
import 'slick-carousel/slick/slick';
import ClockHelper from "../../_helpers/clock.helper";
import ConnectionHelper from "../../_helpers/connection.helper";
import Inputs from "../inputs";
import Layouts from "../layouts";

export default class CarouselLayout {

    public static init(config, appData, LayoutInstance: Layouts): void {

        // Load Clock
        if (typeof appData.clock !== 'undefined' && appData.clock) {
            CarouselLayout.renderClock(config, $("#time span"));
        }

        // Load Server Connection Status
        if (typeof appData.connectionStatus !== 'undefined' && appData.connectionStatus) {
            CarouselLayout.renderConnectionStatus();
        }

        // Initialize Carousel
        CarouselLayout.initializeCarousel(config, $("#menu ul"), LayoutInstance);
    }

    public static renderClock(config, $el): void {
        new ClockHelper(config, $el);
    }

    public static renderConnectionStatus(): void {
        new ConnectionHelper();
    }

    public static initializeCarousel(config, $el, LayoutInstance: Layouts): void {
        CarouselLayout.handleCarouselEvents($el, config, LayoutInstance);
        let slidesToShow = 5;
        if (!$el.is(':visible'))
            $el.show(1);
        if ($el.find('> li').length <= slidesToShow) {
            CarouselLayout.duplicateItems($el, slidesToShow);
        }
        $el.slick({
            rtl: $("body").hasClass('rtl'),
            accessibility: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            speed: config.transitionSpeed,
            useCSS: false,
            useTransform: false
        });
        CarouselLayout.handleCarouselKeys($el);
    }

    public static duplicateItems($el, minCount: number): boolean {
        const currentItemsCount = $el.find('> li').length;
        const cloneCount = Math.ceil(minCount / currentItemsCount);
        for (let i:number = 1; i < cloneCount; i++) {
            $el.find('> li').each(function() {
                $el.append($(this).clone(true));
            });
        }
        return true;
    }

    public static handleCarouselEvents($carousel, config, LayoutInstance: Layouts): void {
        const input = Inputs.instance;

        // $carousel.on('init afterChange', (e) => {
        //     const $currentSlide = $carousel.find('.slick-current').find('li:first a');
        //     $currentSlide.trigger('focus');
        // });

        $(document).on('click', "#menu ul li a", (e) => {
            CarouselLayout.loadModule($carousel, config, LayoutInstance);
        });
        const enterParams = {key: 'carousel.select', title: 'انتخاب برنامه', icon: 'tv', button: false};
        input.addEvent('enter', false, enterParams, () => {
            CarouselLayout.loadModule($carousel, config, LayoutInstance);
        });
    }

    public static destroyCarousel($carousel, config, callback) {
        const self = this;
        $carousel.fadeOut(config.transitionSpeed, () => {
            self.unsetCarouselKeys();
            $carousel.slick('destroy');
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    public static loadModule($carousel, config, LayoutInstance) {
        const $currentSlide = $carousel.find('.slick-current').find('li:first');
        CarouselLayout.destroyCarousel($carousel, config, () => {
            LayoutInstance.loadModule($currentSlide.data('type'));
        });
    }

    public static handleCarouselKeys($carousel): void {
        const input = Inputs.instance;
        const leftParams = {key: 'carousel.left', title: 'چپ', icon: 'left', button: false};
        input.addEvent('left', false, leftParams, () => {
            $carousel.slick('slickNext');
        });
        const rightParams = {key: 'carousel.right', title: 'راست', icon: 'right', button: false};
        input.addEvent('right', false, rightParams, () => {
            $carousel.slick('slickPrev');
        });
    }

    public static unsetCarouselKeys(): void {
        const input = Inputs.instance;
        input.removeEvent('left', {key: 'carousel.left'});
        input.removeEvent('right', {key: 'carousel.right'});
        input.removeEvent('enter', {key: 'carousel.select'});
        $(document).off('click', "#menu ul li a");
    }

}
import * as $ from 'jquery';
import 'slick-carousel/slick/slick';
import Inputs from "../inputs";
import Layouts from "../layouts";

export default class UHDLayout {

    // Static Constructor
    public static init(config, appData, LayoutInstance: Layouts): void {

        const input = Inputs.instance;
        // Remove back key if we are returning back from a module
        input.removeEvent('back,backspace,b', { key: 'module.exit' });

        // Load Clock
        if (typeof appData.clock !== 'undefined' && appData.clock) {
            LayoutInstance.renderClock(config, $("#time span"));
        }

        // Load Server Connection Status
        if (typeof appData.connectionStatus !== 'undefined' && appData.connectionStatus) {
            LayoutInstance.renderConnectionStatus();
        }

        // Initialize Carousel
        UHDLayout.initialize(config, $("#menu ul"), LayoutInstance);
    }

    public static initialize(config, $el, LayoutInstance: Layouts): void {
        UHDLayout.handleEvents($el, config, LayoutInstance);

        // find previous active menu item
        const previousActiveMenuIndex = $el.find('> li.active').index();
        $el.find('li').removeClass('active');

        let slidesToShow = 7;
        if (!$el.is(':visible'))
            $el.show(1);
        if ($el.find('> li').length <= slidesToShow) {
            UHDLayout.duplicateItems($el, slidesToShow);
        }
        $el.slick({
            rtl: $("body").hasClass('rtl'),
            accessibility: false,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            speed: config.transitionSpeed,
            useCSS: false,
            useTransform: false
        });

        // go to previous active menu if any available
        if (previousActiveMenuIndex >= 0) {
            $el.slick('slickGoTo', previousActiveMenuIndex, true);
        }

        UHDLayout.handleKeys($el);
    }

    public static duplicateItems($el, minCount: number): boolean {
        const currentItemsCount = $el.find('> li').length;
        const cloneCount = Math.ceil((minCount + 1) / currentItemsCount);
        for (let i: number = 1; i < cloneCount; i++) {
            $el.find('> li').each(function () {
                $el.append($(this).clone(true));
            });
        }
        return true;
    }

    public static handleEvents($carousel, config, LayoutInstance: Layouts): void {
        const input = Inputs.instance;
        $(document).on('click', "#menu ul li a", (e) => {
            UHDLayout.loadModule($carousel, config, LayoutInstance);
        });
        const enterParams = { key: 'carousel.select', title: 'انتخاب برنامه', icon: 'tv', button: false };
        input.addEvent('enter', false, enterParams, () => {
            UHDLayout.loadModule($carousel, config, LayoutInstance);
        });
    }

    public static async destroy($carousel, config): Promise<void> {
        const self = this;
        $carousel.fadeOut(config.transitionSpeed, () => {
            self.unsetKeys();
            $carousel.slick('destroy');
        });
    }

    public static loadModule($carousel, config, LayoutInstance): void {
        const $currentSlide = $carousel.find('.slick-current').find('li:first');
        $currentSlide.addClass('active');
        UHDLayout.destroy($carousel, config).then(() => {
            const url = typeof $currentSlide.data('url') !== 'undefined' && $currentSlide.data('url')
                ? $currentSlide.data('url')
                : null;
            LayoutInstance.loadModule($currentSlide.data('type'), config, false, url);
        });
    }

    public static handleKeys($carousel): void {
        const input = Inputs.instance;
        const leftParams = { key: 'carousel.left', title: 'چپ', icon: 'left', button: false };
        input.addEvent('left', false, leftParams, () => {
            $carousel.slick('slickNext');
        });
        const rightParams = { key: 'carousel.right', title: 'راست', icon: 'right', button: false };
        input.addEvent('right', false, rightParams, () => {
            $carousel.slick('slickPrev');
        });
    }

    public static unsetKeys(): void {
        const input = Inputs.instance;
        input.removeEvent('left', { key: 'carousel.left' });
        input.removeEvent('right', { key: 'carousel.right' });
        input.removeEvent('enter', { key: 'carousel.select' });
        $(document).off('click', "#menu ul li a");
    }

}

import * as $ from 'jquery';
import 'slick-carousel/slick/slick';
import ClockHelper from "../../_helpers/clock.helper";
import ConnectionHelper from "../../_helpers/connection.helper";
import Inputs from "../inputs";

export default class CarouselLayout {

    public static init(config, appData): void {

        // Load Clock
        if (typeof appData.clock !== 'undefined' && appData.clock) {
            CarouselLayout.renderClock(config, $("#time span"));
        }

        // Load Server Connection Status
        if (typeof appData.connectionStatus !== 'undefined' && appData.connectionStatus) {
            CarouselLayout.renderConnectionStatus();
        }

        // Initialize Carousel
        CarouselLayout.initializeCarousel(config, $("#menu ul"));
    }

    public static renderClock(config, $el): void {
        new ClockHelper(config, $el);
    }

    public static renderConnectionStatus(): void {
        new ConnectionHelper();
    }

    public static initializeCarousel(config, $el): any {
        $el.slick({
            rtl: $("body").hasClass('rtl'),
            accessibility: true,
            slidesToShow: 5,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            speed: config.transitionSpeed,
            useCSS: false,
            useTransform: false
        });
        CarouselLayout.handleCarouselKeys($el);
    }

    public static handleCarouselKeys($carousel) {
        const input = new Inputs();
        const leftParams = {key: 'carousel.left', title: 'چپ', icon: 'left', button: true};
        input.addEvent('left', false, leftParams, () => {
            $carousel.slick('slickNext');
        });
        const rightParams = {key: 'carousel.right', title: 'راست', icon: 'right', button: true};
        input.addEvent('right', false, rightParams, () => {
            $carousel.slick('slickPrev');
        });
    }

}
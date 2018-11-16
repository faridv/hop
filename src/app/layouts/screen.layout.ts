import Layouts from "../layouts";

export default class ScreenLayout {

    public static init(config, appData, LayoutInstance: Layouts): void {

        // Load Clock
        if (typeof appData.clock !== 'undefined' && appData.clock) {
            LayoutInstance.renderClock(config, $("#time span"));
        }

        // Load Server Connection Status
        if (typeof appData.connectionStatus !== 'undefined' && appData.connectionStatus) {
            LayoutInstance.renderConnectionStatus();
        }

        // Initialize Carousel
        ScreenLayout.initialize(appData, LayoutInstance);
    }

    public static initialize(config, LayoutInstance: Layouts): void {
        LayoutInstance.loadModule('stream', config, true);
    }

    public static destroy(): void {
        const self = this;
        // remove main module and layouts
    }

}
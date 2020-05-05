import Layouts from "../layouts";
import Inputs from '../inputs';

export default class PollLayout {

    public static init(config, appData, LayoutInstance: Layouts): void {
        const input = Inputs.instance;
        input.removeEvent('back,backspace,b', {key: 'module.exit'});
        PollLayout.initialize(appData, LayoutInstance);
    }

    public static initialize(config, LayoutInstance: Layouts): void {
        LayoutInstance.loadModule('poll', config, true);
    }

    public static destroy(): void {
        const self = this;
        // remove main module and layouts
    }

}

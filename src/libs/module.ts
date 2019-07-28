import Inputs from '../app/inputs';
import TemplateHelper from '../_helpers/template.helper';
import Layouts from '../app/layouts';

export class Module {

    protected service;
    protected config;
    protected template: TemplateHelper;
    protected input: Inputs;
    protected $el = $('#content');
    protected events = {};
    protected layoutInstance: Layouts;

    constructor(config?, layoutInstance?) {
        this.config = config;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.layoutInstance = layoutInstance;
    }

    load(...args: any[]): void {

    }

    render(data: any, callback?: any): void {

    }

    destroyEvents(instance: any): boolean {
        for (let item in this.events) {
            instance.input.removeEvent(this.events[item]['control'], {key: item});
        }
        return true;
    }

    destroy(instance?: any): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        return this.destroyEvents(self);
    }

}
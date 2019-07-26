import Inputs from '../app/inputs';
import TemplateHelper from '../_helpers/template.helper';

export class Module {

    protected service;
    protected template: TemplateHelper;
    protected input: Inputs;
    protected $el = $('#content');
    protected events = {};

    constructor(config?, layoutInstance?) {
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
    }

    load(...args: any): void {

    }

    render(data: any, callback?: any): void {

    }

    destroy(instance?: any): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        for (let item in this.events) {
            self.input.removeEvent(this.events[item]['control'], {key: item});
        }
        return true;
    }

}
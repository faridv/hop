import Inputs from '../app/inputs';
import TemplateHelper from '../_helpers/template.helper';
import Layouts from '../app/layouts';
import Store from '../_utilities/storage.utility';
import {PlayerService} from '../_helpers/player.helper';
import * as $ from 'jquery';

interface IModule {
}

export abstract class Module implements IModule {

    protected service;
    protected config;
    protected template;
    protected store;
    protected templateHelper: TemplateHelper;
    protected input: Inputs;
    protected $el = $('#content');
    protected events: any;
    protected layoutInstance: Layouts;
    protected playerService;
    protected playerInstance;
    protected moduleType: string;

    constructor(config, layoutInstance, moduleType?: string) {
        this.config = config;
        this.layoutInstance = layoutInstance;
        this.templateHelper = TemplateHelper.instance;
        this.playerService = PlayerService;
        this.input = Inputs.instance;
        this.store = Store;
        this.moduleType = typeof moduleType !== 'undefined' ? moduleType : null;
    }

    public prepareControls(): any {
        let events = this.events;
        for (let key in events) {
            if (typeof events[key]['key'] === 'undefined')
                events[key]['key'] = key;
            if (typeof events[key]['button'] === 'undefined')
                events[key]['button'] = true;
            if (typeof this.events[key]['icon'] === 'undefined')
                events[key]['icon'] = key.indexOf('.') !== -1 ? key.split('.')[2] : key;
        }
        return events;
    }

    public load(...args: any[]): void {

    }

    public render(data: any, callback?: any): void {

    }

    public destroyEvents(instance: any): boolean {
        for (let item in this.events) {
            instance.input.removeEvent(this.events[item]['control'], {key: item});
        }
        return true;
    }

    public destroy(instance?: any): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        this.templateHelper.loading(false);
        return this.destroyEvents(self);
    }

}

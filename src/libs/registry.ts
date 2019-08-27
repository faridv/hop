export class Registry {

    protected static _instance: Registry;
    protected _modules = {};

    constructor(items?: any) {
        if (typeof items !== 'undefined')
            this.modules = items;
    }

    public set modules(items) {
        this._modules = items;
    }

    public get modules() {
        return this._modules;
    }

    public getItem(key): {} {
        return typeof this.modules[key] !== 'undefined' ? this.modules[key] : {};
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
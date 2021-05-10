import {HttpHelper, ApiHelper} from '../_helpers';

export class Service {

    protected static _instance: Service;
    protected http = HttpHelper;
    protected api = ApiHelper;

    constructor() {
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

}

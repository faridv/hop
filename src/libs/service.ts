import httpHelper from '../_helpers/http.helper';
import {ApiHelper} from '../_helpers/api.helper';

export class Service {

    protected static _instance: Service;
    protected http = httpHelper;
    protected api = ApiHelper;

    constructor() {
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

}
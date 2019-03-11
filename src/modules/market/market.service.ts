import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class MarketService {

    private static _instance: MarketService;
    private http = httpHelper;

    constructor() {
    }

    getLabels(parentId: number = 1) {
        return this.http.get(ApiHelper.get('market.labels'), {pid: parentId});
    }

    getData(parentId: number) {
        return this.http.get(ApiHelper.get('market.data'), {pid: parentId});
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
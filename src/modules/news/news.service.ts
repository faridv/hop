import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class NewsService {

    private static _instance: NewsService;
    private http = httpHelper;

    constructor() {
    }

    getLatest() {
        return this.http.get(ApiHelper.get('news'), {Categories: '-1', count: 20, ordering: 'Published desc'});
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
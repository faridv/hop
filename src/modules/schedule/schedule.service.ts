import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class ScheduleService {

    private static _instance: ScheduleService;
    private http = httpHelper;

    constructor() {
    }

    getDate(date) {
        return this.http.get(ApiHelper.get('schedule'), {date: date});
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
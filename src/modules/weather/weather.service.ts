import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class WeatherService {
    private static _instance: WeatherService;
    private http = httpHelper;
    private yqlQuery = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="({coordinates})") and u="c"';

    constructor() {
    }

    getCity(coordinates) {
        return this.http.get(ApiHelper.get('weather'), {format: 'json', q: this.yqlQuery.replace(/{coordinates}/g, coordinates)});
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
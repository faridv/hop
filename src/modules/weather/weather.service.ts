import httpHelper from "../../_helpers/http.helper";
import { ApiHelper } from "../../_helpers/api.helper";

export class WeatherService {
    private static _instance: WeatherService;
    private http = httpHelper;

    constructor() {
    }

    getCity(coordinates) {
        return this.http.get(ApiHelper.get('weather'), { lon: coordinates.split(',')[0], lat: coordinates.split(',')[1] });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
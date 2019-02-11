import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class WeatherService {
    private static _instance: WeatherService;
    private http = httpHelper;
    private appId = '0b692e71250c1114ced02ee70446131d';

    constructor() {
    }

    getCity(coordinates) {
        const coords = {
            lat: coordinates.split(',')[0],
            lon: coordinates.split(',')[1]
        };
        return this.http.get(ApiHelper.get('weather'), {
            lat: coords.lat,
            lon: coords.lon,
            units: 'metric',
            APPID: this.appId
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
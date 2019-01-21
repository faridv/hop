import httpHelper from "../../_helpers/http.helper";
import { ApiHelper } from "../../_helpers/api.helper";

export class WeatherService {
    private static _instance: WeatherService;
    private http = httpHelper;
    private yqlQuery = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="({coordinates})") and u="c"';

    constructor() {
    }

    getCity(coordinates) {
        var OAuth = require('oauth');
        var header = { "Yahoo-App-Id": "ngWTui6o" };
        var coords = {lat: coordinates.split(',')[0], lon: coordinates.split(',')[1]};
        var request = new OAuth.OAuth(
            null,
            null,
            'dj0yJmk9MVRhZE1FcHE5dFBCJmQ9WVdrOWJtZFhWSFZwTm04bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD03NA--',
            'e19c8e0260309d86ceb0d4e1aa78e892a243bd9d',
            '1.0',
            null,
            'HMAC-SHA1',
            null,
            header
        );
        return request.get(
            'https://weather-ydn-yql.media.yahoo.com/forecastrss?lat=' + coords.lat + '&lon=' + coords.lon + '&format=json&u=c',
            null,
            null,
            function (err, data, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data)
                }
            }
        );

        // return this.http.get(ApiHelper.get('weather'), { format: 'json', q: this.yqlQuery.replace(/{coordinates}/g, coordinates) });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
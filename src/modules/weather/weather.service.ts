import {Service} from '../../libs/service';

export class WeatherService extends Service {

    constructor() {
        super();
    }

    getCity(coordinates) {
        return this.http.get(this.api.get('weather'), {lon: coordinates.split(',')[1], lat: coordinates.split(',')[0]});
    }

}
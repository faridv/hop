import { Service } from '../../libs';

export class WeatherService extends Service {

    constructor() {
        super();
    }

    public getCity(coordinates): JQuery.jqXHR {
        return this.http.get(this.api.get('weather'), { lon: coordinates.split(',')[1], lat: coordinates.split(',')[0] });
    }

}

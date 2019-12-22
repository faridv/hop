import {Service} from '../../libs/service';

export class TehranAirService extends Service {

    constructor() {
        super();
    }

    get(type) {
        return this.http.get(this.api.get('tehran-air').replace(/{type}/, type));
    }

}
import {Service} from '../../libs/service';

export class ScheduleService extends Service {

    getIPG(date) {
        return this.http.get(this.api.get('ipg'), {date: date});
    }

    getDate(date) {
        return this.http.get(this.api.get('schedule'), {date: date});
    }

    getMedia(mediaId) {
        return this.http.get(this.api.get('media', mediaId));
    }

}
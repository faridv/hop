import {Service} from '../../libs/service';

export class ScheduleService extends Service {

    getDate(date) {
        return this.http.get(this.api.get('schedule'), {date: date});
    }

    getMedia(mediaId) {
        return this.http.get(this.api.get('media', mediaId));
    }

}
import { Service } from '../../libs';

export class PrayerTimesService extends Service {

    public getTimes(times: string) {
        return this.http.get(this.api.get('islamic-prayers', times));
    }

}

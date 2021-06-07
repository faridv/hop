import { Service } from '../../libs';

export class SepehrService extends Service {

    getCategories() {
        return this.http.get(this.api.get('sepehr', 'categories'));
    }

    getChannels() {
        return this.http.get(this.api.get('sepehr', 'channels'));
    }

    getChannelsByCategory(catid: number) {
        return this.http.get(this.api.get('sepehr', `channels/${catid.toString()}`));
    }

    getEpg(channelId: number, date?: string) {
        return date
            ? this.http.get(this.api.get('sepehr', `epg/${channelId.toString()}/date/${date}`))
            : this.http.get(this.api.get('sepehr', `epg/${channelId.toString()}`));
    }

}

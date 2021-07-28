import { Service } from '../../libs';

export class SepehrService extends Service {

    public getCategories(): JQuery.jqXHR {
        return this.http.get(this.api.get('sepehr', 'categories'));
    }

    public getChannels(): JQuery.jqXHR {
        return this.http.get(this.api.get('sepehr', 'channels'));
    }

    public getChannelsByCategory(catid: number): JQuery.jqXHR {
        return this.http.get(this.api.get('sepehr', `channels/${catid.toString()}`));
    }

    public getEpg(channelId: number, date?: string): JQuery.jqXHR {
        return date
            ? this.http.get(this.api.get('sepehr', `epg/${channelId.toString()}/date/${date}`))
            : this.http.get(this.api.get('sepehr', `epg/${channelId.toString()}`));
    }

}

import { Service } from '../../libs';

export class MarketService extends Service {

    public getLabels(parentId: number = 1): JQuery.jqXHR {
        return this.http.get(this.api.get('market.labels', <string><any>parentId));
    }

    public getData(parentId: number): JQuery.jqXHR {
        return this.http.get(this.api.get('market.data', <string><any>parentId));
    }

}

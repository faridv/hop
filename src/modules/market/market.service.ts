import {Service} from '../../libs/service';

export class MarketService extends Service {

    getLabels(parentId: number = 1) {
        return this.http.get(this.api.get('market.labels', <string><any>parentId));
    }

    getData(parentId: number) {
        return this.http.get(this.api.get('market.data', <string><any>parentId));
    }

}
import { Service } from '../../libs';

export class FaqService extends Service {

    public getItems() {
        return this.http.get(this.api.get('items'));
    }

    public getItem(itemId: number) {
        return this.http.get(this.api.get('items', itemId.toString()));
    }

    public getItemsByCategory(catid: number) {
        return this.http.get(this.api.get('items', `?catid=${catid}`));
    }

    public getItemsByParentCategory(pcatid: number) {
        return this.http.get(this.api.get('items', `?pcatid=${pcatid}`));
    }

}

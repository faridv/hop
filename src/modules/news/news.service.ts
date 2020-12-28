import {Service} from '../../libs';

export class NewsService extends Service {

    public getLatest() {
        return this.http.get(this.api.get('news'));
    }

    public getUhdItems(categoryId: string) {
        return this.http.get(this.api.get('items') + `?catid=${categoryId}`);
    }

    public getByCategory(categoryId: string = null) {
        return categoryId ? this.http.get(this.api.get('news', categoryId)) : this.getLatest();
    }

}

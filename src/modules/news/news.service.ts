import {Service} from '../../libs/service';

export class NewsService extends Service {

    getLatest() {
        return this.http.get(this.api.get('news'));
    }

    getByCategory(categoryId: string = null) {
        return categoryId ? this.http.get(this.api.get('news', categoryId)) : this.getLatest();
    }

}

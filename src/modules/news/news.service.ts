import { Service } from '../../libs';

export class NewsService extends Service {

    public getNews() {
        return this.http.get(this.api.get('news'));
    }

    public getByCategory(categoryId: string = null) {
        return categoryId ? this.http.get(this.api.get('news', categoryId)) : this.getNews();
    }

    public getItemsByCategory(categoryId: string) {
        return this.http.get(this.api.get('items') + `?catid=${categoryId}`);
    }

    public getNewsDetails(itemId: number) {
        return this.http.get(this.api.get('news', itemId.toString()));
    }

}

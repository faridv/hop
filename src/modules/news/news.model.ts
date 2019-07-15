export class News {
    id: number;
    shortTitle: string;
    title: string;
    summary: string;
    text: string;
    categories?: any;
    thumbnail: NewsMedia[];
}

export class NewsMedia {
    url: string;
    desc: string;
}
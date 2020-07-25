export class News {
    id: number;
    shortTitle: string;
    title: string;
    summary: string;
    text: string;
    categories?: any;
    thumbnail: NewsMedia[];
    media: string;
}

export class NewsMedia {
    url: string;
    desc: string;
}

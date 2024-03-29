export interface News {
    id: number;
    shortTitle: string;
    title: string;
    summary: string;
    text: string;
    categories?: any;
    thumbnail: NewsMedia[];
    media?: string;
    category?: string;
    // whether show in fullscreen
    cover?: boolean;
}

export interface NewsMedia {
    url: string;
    desc: string;
}

export interface NewsCategory {
    [categoryTitle: string]: News[]
}

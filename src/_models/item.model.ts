import {Tag} from './tag.model';

export interface Item {
    id: number;
    title: string;
    link: string;
    category: string;
    categoryLink: string;
    state: number;
    introtext: string;
    fulltext?: string;
    video: string;
    created: string;
    img: string;
    thumb: string;
    tags: Tag[];

    url?: string;
    collapsed?: boolean;
}

export class News {
    Alias: string;
    Categories: NewsCategories[];
    Comments: any;
    Contributor: number;
    ContributorObject: any;
    Created: string;
    Created_By: number;
    Flow: any;
    Fulltext: string;
    Id: number;
    Introtext: string;
    IsPublished: number;
    ItemPriority: number;
    Metadesc: string;
    Modified: string;
    Modified_By: number;
    Owner: number;
    OwnerName: any;
    Published: string;
    Published_By: number;
    Repositories: NewsRepositories[];
    ShortTitle: string;
    State: number;
    Tags: any;
    Telegram: number;
    Title: string;
    Viewcount: number;
    Youtube: any;
    shortUrl: any;
}

export class NewsCategories {
    Id: number;
    Metadesc: string;
    Parent_Id: number;
    Published: number;
    Sort: number;
    Title: string;
}

export class NewsRepositories {
    Created: string;
    Created_By: number;
    Description: string;
    FilePath: string;
    Id: number;
    IsPublished: number;
    Kind: number;
    Priority: number;
    Tags: any;
    Thumbnail: string;
    Title: string;
}
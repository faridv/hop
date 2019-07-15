export interface IPG {
    current?: boolean;
    id: number;
    uid: string;
    time: string;
    duration: string;
    name: string;
    kind: string;
    end: string;
    metadata: object;
    image: string;
    url: string;
    description: string;
    summary: string;
    category: string;
    media: string;
    episode: string;
    total_episode: number;
}

export class IPGs extends Array<IPG> {
}

export interface Schedule {
    mediaId: number;
    description: string;
    start: string;
    duration: string;
    episodeTitle: string;
    programTitle: string;
    thumbnail: string;
    hasVideo: boolean;
}
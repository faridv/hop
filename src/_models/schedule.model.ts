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
    MediaId: number;
    description: string;
    duration: string;
    episodeLink: string;
    episodeTitle: string;
    hasVideo: boolean;
    isCurrent: boolean;
    programLink: string;
    programTitle: string;
    start: string;
    thumbnail: string;

    media?: string;
}
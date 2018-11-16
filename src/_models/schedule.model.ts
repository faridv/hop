export interface Schedule {
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

export class Schedules extends Array<Schedule> {
}
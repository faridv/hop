export interface SepehrCategories {
    id: number;
    name: string;
    poster: string;
}

export interface SepehrChannel {
    id: number;
    name: string;
    number: number;
    icon: string;
    poster?: string;
    preview: string;
    stream: string;
    current: SepehrChannelCurrentProgram;
}

export interface SepehrChannelCurrentProgram {
    start: number;
    duration: number;
    title: string;
    summary: string;
    desc: string;
}

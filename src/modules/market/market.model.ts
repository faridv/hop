export class Market {
    id: number;
    title: string;
    unit: string;
    ref: string;
    value: string;
    lastValue: string;

    difference?: any;
    up?: boolean;
    down?: boolean;
    page?: number;
}
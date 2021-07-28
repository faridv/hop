export interface EventData {
    control: string;
    title: string;
    icon?: string;
    button?: boolean;
    once?: boolean;
    handler?: boolean;
    eventKey?: string;

}
export interface Event {
    [title: string]: EventData
}

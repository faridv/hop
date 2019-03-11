export class Market {
    Id: number;
    Tree_Id: number;
    Value: string;
    Datetime: string;
    Last_Datetime: string;
    UserId: number;
    Last_Value: string;
    Title: string;
    Unit: string;
    Ref: string;
    UserText: string;
    State: number;
    Sort: number;
    Pid: number;

    difference?: any;
    up?: boolean;
    down?: boolean;
    page?: number;
}
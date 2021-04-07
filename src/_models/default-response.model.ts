export interface DefaultResponse<T = any> {
    success: boolean;
    cache: boolean;
    source: string;
    data: T;
}

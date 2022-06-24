export interface Response<T> {
    limit: number;
    data: T;
    page: number;
    total: number;
}
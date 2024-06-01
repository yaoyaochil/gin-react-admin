


export interface BaseResponse<T> {
    code: number;
    msg: string;
    data: T;
}


export interface BaseDetailed<T> {
    list: T;
    total: number;
    page: number;
    pageSize: number;
}
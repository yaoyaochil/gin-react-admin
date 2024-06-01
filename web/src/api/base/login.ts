import service from "@/utils/request.ts";
import {BaseResponse} from "@/shared/response/BaseResponse.ts";
import {LoginResponse} from "@/shared/response/LoginResponse.ts";


export default function login(data: { username: string, password: string }):Promise<BaseResponse<LoginResponse>> {
    return service({
        url: '/base/login',
        method: 'post',
        data
    })
}
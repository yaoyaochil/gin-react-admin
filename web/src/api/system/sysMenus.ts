import {BaseDetailed, BaseResponse} from "@/shared/response/BaseResponse.ts";
import service from "@/utils/request.ts";
import {RouterType} from "@/store/routerStore.tsx";

/**
 * 获取菜单列表
 * @param data {page:number, pageSize:number}
 */
export const getMenuList = (data:{page:number, pageSize:number}) :Promise<BaseResponse<BaseDetailed<RouterType[]>>> => {
    return service({
        url: '/menu/getMenuList',
        method: 'post',
        data
    })
}
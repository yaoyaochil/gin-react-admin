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

/**
 * 新增菜单
 * @param data {RouterType}
 */
export const createMenu = (data:RouterType) :Promise<BaseResponse<null>> => {
    return service({
        url: '/menu/createMenu',
        method: 'post',
        data
    })
}

/**
 * 编辑菜单
 * @param data {RouterType}
 */
export const updateMenu = (data:RouterType) :Promise<BaseResponse<null>> => {
    return service({
        url: '/menu/updateMenu',
        method: 'post',
        data
    })
}


/**
 * 删除菜单
 * @param data {id:number}
 */
export const deleteMenu = (data:{id:number}) :Promise<BaseResponse<null>> => {
    return service({
        url: '/menu/deleteMenu',
        method: 'post',
        data
    })
}
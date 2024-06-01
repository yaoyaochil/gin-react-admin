// use react-router-dom to manage routes

import {createBrowserRouter, Navigate, RouteObject, RouterProvider, useLocation} from "react-router-dom";
import {RouterType, useRouterStore} from "@/store/routerStore.tsx";
import {createComponent} from "@/shared/componentLoad.tsx";
import {useEffect} from "react";
import KeepAlive from "react-activation";


// 获取当前路由
export const useMenuRouter = () => {
    const {pathname} = useLocation();
    // pathname.split("/").filter(Boolean); 第一个/保留
    return pathname.split("/").filter(Boolean);
}


/**
 * 路由组件
 * @constructor
 */
export default function RouterComponent() {
    // 从路由状态管理中获取路由
    const router = useRouterStore((state) => state.router);

    /**
     * 格式化路由 根据 keepAlive 字段判断是否需要缓存
     * @param router
     */
    function formatRouter(router: RouterType[]): RouteObject[] {
        const routeList: RouteObject[] = [];
        router.forEach((item) => {
            const element = item.keepAlive
                ? <KeepAlive id={String(item.ID)} alive={item.keepAlive}>{createComponent(item.element as string)}</KeepAlive>
                : createComponent(item.element as string);

            if (item.children && item.children.length > 0) {
                const children = formatRouter(item.children);
                routeList.push({
                    path: item.path,
                    element: element,
                    children: children,
                });
            } else {
                routeList.push({
                    path: item.path,
                    element: element,
                    index: item.index
                });
            }
        });
        return routeList;
    }

    /**
     * 查找 index: true 的路由
     * @param router
     */
    function findIndexRouter(router: RouteObject[]): string | undefined {
        for (let i = 0; i < router.length; i++) {
            if (router[i].index) {
                return router[i].path as string;
            }
            // 递归查找子路由 这里很奇怪 明明判断了children?.length 但是还是会报错 所以加了一个注释
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (router[i].children?.length && router[i].children.length > 0) {
                const childPath = findIndexRouter(router[i].children || []);
                if (childPath) {
                    return `${router[i].path}/${childPath}`;
                }
            }
        }
        return undefined;
    }


    // 格式化路由
    const formatRouterList = formatRouter(router) as RouteObject[];


    // 重定向到 index: true 的路由
    formatRouterList.push({
        path: "/",
        // 重定向到 index: true 的路由
        element: <Navigate to={findIndexRouter(formatRouterList) as string} replace={true}/>,
    })
    let routes = createBrowserRouter(formatRouterList)

    // 监听路由变化
    useEffect(() => {
        routes = createBrowserRouter(formatRouterList);
    }, [router]);

    return (
        <div className={"w-screen h-screen"}>
            <RouterProvider router={routes}/>
        </div>
    )
}
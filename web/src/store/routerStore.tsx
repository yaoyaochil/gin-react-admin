import {create} from "zustand";
import {ReactNode} from "react";


export interface RouterType {
    ID?: number;
    path: string;
    element?: string | ReactNode;
    children?: RouterType[];
    index?: boolean;
    label?: string;
    icon?: string;
    orderNum?: number;
    keepAlive?: boolean; // 添加 keepAlive 字段
}


type RouterStore = {
    router: RouterType[];
    setRouter: (router: RouterType[]) => void;
}

const routerList:RouterType[] = [
    {
        path: "/login",
        element: "pages/login/page.tsx",
    },
    {
        path: "*",
        element: "pages/404/page.tsx",
    }
]


/**
 * Store for the router
 * @param set - set the router
 * @returns
 * @constructor
 */
export const useRouterStore = create<RouterStore>((set) => {
    const router: RouterType[] = routerList;
    // const indexRoute = findIndexRouter(router);
    // if (indexRoute) {
    //     router.unshift({
    //         path: "/",
    //         // 重定向到 index: true 的路由
    //         element: <Navigate to={indexRoute} replace={true}/>,
    //     });
    // }
    return {
        router,
        setRouter: (router) => set({router})
    };
});
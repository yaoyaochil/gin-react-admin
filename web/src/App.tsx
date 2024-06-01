import RouterComponent from "@/router/routes.tsx";
import {getMenuList} from "@/api/system/sysMenus.ts";
import {useRouterStore} from "@/store/routerStore.tsx";
import {message} from "@/shared/EscapeAntd.tsx";
import {useEffect} from "react";
import {AliveScope} from "react-activation";

function App() {
    const getMenuData = async () => {
        const res = await getMenuList({page: 1, pageSize: 999});
        if (res.code === 0) {
            // 更新routerStore 在原基础添加新的菜单路由
            const routerList = useRouterStore.getState().router;
            useRouterStore.setState({
                router: routerList.concat(res.data.list)
            });
            return
        }
        message.error("菜单路由获取失败");
    }

    useEffect(() => {
        // ================== 获取路由及初始化菜单 ==================
        getMenuData();
        // ================== END ==================
    }, []);

    return (
        <AliveScope>
            <RouterComponent/>
        </AliveScope>
    )
}

export default App

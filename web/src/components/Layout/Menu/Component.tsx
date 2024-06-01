import {Menu} from "antd";
import useMenuStore, {formatMenu} from "@/store/menuStore.tsx";
import {useCallback, useEffect} from "react";
import {useMenuRouter} from "@/router/routes.tsx";
import {useNavigate} from "react-router-dom";
import {useRouterStore} from "@/store/routerStore.tsx";


export default function MenuComponent() {
    const menuItems = useMenuStore((state) => state.menuItem); // 菜单项
    const selectedKeys = useMenuStore((state) => state.selectedItem); // 选中的菜单项
    const openKeys = useMenuStore((state) => state.openKeys); // 展开的菜单项
    const setOpenKeys = useMenuStore((state) => state.setOpenKeys); // 更新展开的菜单项到状态管理
    const menuRouter = useMenuRouter(); // 菜单路由
    const navigate = useNavigate(); // 路由跳转

    // 初始化菜单项
    const initMenu = useCallback(() => {
        // 初始化菜单项
        useMenuStore.setState({menuItem: formatMenu(useRouterStore.getState().router)});

        useMenuStore.setState({selectedItem: menuRouter});
        // 如果长度大于1，说明有子菜单 需要展开 将最后一个之前的所有项展开 忽略layout
        if (menuRouter.length > 1) {
            setOpenKeys(menuRouter.slice(0, menuRouter.length - 1));
        }
    }, [menuRouter, setOpenKeys]);


    useEffect(() => {
        // 初始化菜单项
        initMenu();
    }, []);

    return (
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            openKeys={openKeys}
            onSelect={({selectedKeys}) => {
                // 更新选中的菜单项到状态管理
                useMenuStore.setState({selectedItem: selectedKeys});
            }}
            onOpenChange={(openKeys) => {
                // 更新展开的菜单项到状态管理
                useMenuStore.setState({openKeys});
            }}
            items={menuItems}
            onClick={(item) => {
                // 路由跳转
                const path = item.keyPath.reverse().join('/');
                navigate('/layout/' + path);
            }}
        />
    );
}
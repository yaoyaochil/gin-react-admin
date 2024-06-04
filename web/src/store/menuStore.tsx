import {create} from "zustand";
import {MenuProps} from "antd";
import {RouterType} from "@/store/routerStore.tsx";
import {createIcon} from "@/shared/componentLoad.tsx";


type MenuItem = Required<MenuProps>['items'][number];

interface MenuStore {
    menuItem: MenuItem[];
    selectedItem: string[];
    openKeys: string[];
    setMenuItem: (menuItem: MenuItem[]) => void;
    setSelectedItem: (selectedItem: string[]) => void;
    setOpenKeys: (openKeys: string[]) => void;
}

// 递归排序函数
const sortMenu = (items: RouterType[]): RouterType[] => {
    // 按照orderNum排序 如果没有orderNum则默认为0
    return items.sort((a, b) => (a.orderNum || 0) - (b.orderNum || 0)).map((item) => {
        if (item.children) {
            item.children = sortMenu(item.children);
        }
        return item;
    });
};

// format the menu 将路由转换为菜单项
export function formatMenu(menu: RouterType[]): MenuItem[] {
    const menuItems: MenuItem[] = [];
    const sortedMenu = sortMenu(menu);
    sortedMenu.forEach((item) => {
        // 将路由转换为菜单项 只有layout下的路由才会显示在菜单中 并且如果有子路由的话 会显示在子菜单中
        if (item.path === '/layout') {
            item.children?.forEach((child) => {
                // 如果有子路由 则显示在子菜单中
                if (child.children?.length === 0 && !child.hidden) {
                    menuItems.push({
                        key: child.path,
                        label: child.label,
                        icon: createIcon(child.icon),
                    });
                } else {
                    if (!child.hidden) {
                        menuItems.push({
                            key: child.path,
                            label: child.label,
                            icon: createIcon(child.icon),
                            children: child.children?.map((subChild) => ({
                                key: subChild.path,
                                label: subChild.label,
                                icon: createIcon(subChild.icon),
                            })),
                        });
                    }
                }
            });
        }
    });
    return menuItems;
}

/**
 * Store for the menu items
 * @param set - set the menu items
 * @returns
 * @constructor
 */
export const useMenuStore = create<MenuStore>((set) => ({
    menuItem: [],
    setMenuItem: (menuItem: MenuItem[]) => set({menuItem}),
    selectedItem: ['dashboard'],
    setSelectedItem: (selectedItem: string[]) => set({selectedItem}),
    openKeys: [],
    setOpenKeys: (openKeys: string[]) => set({openKeys}),
}));


export default useMenuStore;
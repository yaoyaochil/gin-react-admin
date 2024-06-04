import * as AntdIcon from '@ant-design/icons';
import {lazy, ReactNode, Suspense} from "react";
import LoadingPage from "@/components/Loading/page.tsx";
import useUserStore from "@/store/userStore.ts";


// 创建图标 传入图标名称
export function createIcon(icon: string | undefined): ReactNode {
    if (icon && (AntdIcon as any)[icon]) {
        const Icon = (AntdIcon as any)[icon];
        return <Icon />;
    }
    return null;
}

// 懒加载组件 传入组件路径
export function createComponent(component_path: string | undefined): ReactNode{
    const user = useUserStore.getState();
    if (!user.token && window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
    // 使用动态import加载组件
    if (component_path) {
        const Component = lazy(() => import(/* @vite-ignore */`../${component_path}`));
        return (
            <Suspense fallback={<LoadingPage/>}>
                <Component />
            </Suspense>
        )
    }
    return null;
}
import * as AntdIcon from '@ant-design/icons';
import {lazy, ReactNode, Suspense} from "react";
import LoadingPage from "@/components/Loading/page.tsx";



// 创建图标 传入图标名称
export function createIcon(icon: string | undefined): ReactNode{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (icon && AntdIcon[icon]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const Icon = AntdIcon[icon];
        return <Icon />;
    }
    return null;
}

// 懒加载组件 传入组件路径
export function createComponent(component_path: string | undefined): ReactNode{
    // 使用动态import加载组件
    if (component_path) {
        const Component = lazy(() => import(/* @vite-ignore */`../${component_path}`));
        return (
            <Suspense fallback={<LoadingPage />}>
                <Component />
            </Suspense>
        )
    }
    return null;
}
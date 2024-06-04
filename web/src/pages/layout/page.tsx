import {useEffect, useState} from 'react';
import {
    GithubOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    SyncOutlined,
    UserOutlined,
    PoweroffOutlined,
    DownOutlined,
} from '@ant-design/icons';
import {Avatar, Breadcrumb, Button, Divider, Dropdown, Layout, theme} from 'antd';
import type { MenuProps } from 'antd';
import SystemLogoIcon from "@/components/SystemLogoIcon/Icon.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import MenuComponent from "@/components/Layout/Menu/Component.tsx";
import useUserStore from "@/store/userStore.ts";
import {message} from "@/shared/EscapeAntd.tsx";
import FloatButtonComponent from "@/components/Layout/FloatButton/Component.tsx";
import Tag from "@/components/Tag/Component.tsx";
import {useRouterStore} from "@/store/routerStore.tsx";
import {ItemType} from "antd/es/breadcrumb/Breadcrumb";
import {findPathLabels} from "@/utils/format.ts";


const { Header, Sider, Content,Footer } = Layout;

export default function LayoutPage() {
    const [collapsed, setCollapsed] = useState(false);
    const token = useUserStore((state) => state.token);
    const user = useUserStore((state) => state.userInfo);
    const userStore = useUserStore();
    const [breadcrumb, setBreadcrumb] = useState<ItemType[]>([]);
    const router = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const DropdownMenu:MenuProps['items'] = [
        {
            key: '1',
            icon: <GithubOutlined />,
            label: 'Github',
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: '个人中心',
        },
        {
            key: '3',
            icon: <PoweroffOutlined />,
            label: '退出登录',
            danger: true,
            onClick: () => {
                userStore.Logout();
            }
        }
    ] as MenuProps['items'];


    useEffect(() => {
        // 根据useRouterStore中的router生成面包屑
        const path = window.location.pathname;
        const routerList = useRouterStore.getState();
        let pathLabels:ItemType[]= [];
        routerList.router.forEach((item) => {
            if (item.path === '/layout') {
                findPathLabels(item, path)?.forEach((label) => {
                    if (label !== '根布局') {
                        pathLabels.push({
                            key: label,
                            title: label,
                        })
                    }
                })
            }
        })
        setBreadcrumb(pathLabels)
    }, [window.location.pathname]);

    useEffect(() => {
        if (token === "") {
            message.error('无权限访问');
            router('/login');
        }

        // ================== 侧边栏折叠 ==================
        const handleResize = () => {
            if (window.innerWidth < 720) {
                setCollapsed(true);
                return
            }
            if (window.innerWidth >= 720) {
                setCollapsed(false);
                return
            }
        }
        // ================== END ==================

        // ================== 监听窗口变化 ==================
        window.addEventListener('resize', handleResize);

        return () => {
            // ================== 移除事件监听 ==================
            window.removeEventListener('resize', handleResize);
        }

    }, [router, token, user]);

    return (
        <Layout style={{
            height: '100vh',
            minWidth: '1280px',
            minHeight: '720px',
            overflow: 'hidden',
        }}>
            <FloatButtonComponent />
            <Sider trigger={null} collapsible collapsed={collapsed} style={{background: "#fff"}}>
                <div className="h-16 w-full p-10 flex flex-col justify-center items-center">
                    <div className={`flex items-end ${collapsed?"rounded transition-all duration-200":"rounded transition-all duration-200"}`}>
                        <SystemLogoIcon className="w-9 h-9 bg-amber-200 p-1 rounded"/>
                        <span className={`text-4xl text-end leading-none transition-opacity duration-300 ${collapsed?"w-0 opacity-0":"opacity-100 ml-2 flex-nowrap delay-200"}`}>{
                            // 系统名称
                            import.meta.env.VITE_APP_NAME
                        }</span>
                    </div>
                </div>
                <MenuComponent />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <div className={'w-full h-full flex items-center'}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                            }}
                        />
                        <Breadcrumb items={breadcrumb} style={{marginLeft: 5}} />
                        <div className={'ml-auto mr-4 flex items-center gap-7'}>
                            <div className={'flex gap-3'}>
                                <Button icon={<SearchOutlined/>} type={'default'} shape={'circle'} size={'middle'}/>
                                <Button icon={<SyncOutlined />} type={'default'} shape={'circle'} size={'middle'}/>
                            </div>
                            <Dropdown menu={{items:DropdownMenu}}>
                                <span className={'flex items-center justify-center cursor-pointer'}>
                                    <Avatar size={'default'}
                                            src={user.headerImg}/>
                                    <span className={'ml-1 mr-1'}>{user.nickName}</span>
                                    <DownOutlined />
                                </span>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        minHeight: 280,
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <Divider style={{margin: 0}}/>
                    <div className={"h-full w-full flex flex-col bg-gray-50 pb-0"}>
                        <div className={'bg-white p-2'}>
                            <Tag tags={[
                                {
                                    id: 1,
                                    name: '首页',
                                    color: 'bg-green-200',
                                    icon: 'ri-home-2-line'
                                },
                                {
                                    id: 2,
                                    name: '菜单管理',
                                    color: 'bg-green-200',
                                    icon: 'ri-home-2-line'
                                }
                            ]} selected={2}/>
                        </div>
                        <div className={'flex-1 w-full p-4 pb-0'}>
                            <Outlet />
                        </div>
                    </div>
                </Content>
                <Footer style={{
                    height: 64,
                    background: 'rgb(249 250 251)',
                    borderTop: 0
                }}>
                    <div className={"flex justify-center items-center mt-auto mb-3"}>
                        <span className={"text-sm text-gray-400"}>© 2024 Eto</span>
                        <span className={"text-sm text-gray-400 ml-1 mr-1"}>All Rights Reserved</span>
                        <a href="https://github.com/yaoyaochil/eto-gateway" target="_blank" rel="noreferrer">
                            <GithubOutlined className={"text-gray-400"}/>
                            <span className={"text-sm text-gray-400 ml-1"}>Github @yaoyaochil</span>
                        </a>
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
}
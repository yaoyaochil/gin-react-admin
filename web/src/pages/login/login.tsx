import {Button, Form, FormProps, Input} from "antd";
import {message} from "@/shared/EscapeAntd.tsx";
import login from "@/api/base/login.ts";
import useUserStore from "@/store/userStore.ts";
import {useNavigate} from "react-router-dom";
import {getMenuList} from "@/api/system/sysMenus.ts";
import {useRouterStore} from "@/store/routerStore.tsx";

type FormItem = {
    username: string;
    password: string;
}

export default function Login() {
    const setUser = useUserStore().setState;
    const router = useNavigate();

    const getMenuData = async () => {
        const res = await getMenuList({page: 1, pageSize: 999});
        if (res.code === 0) {
            // 清空routerStore
            useRouterStore.setState({
                router: [
                    {
                        path: "/login",
                        element: "pages/login/page.tsx",
                    },
                    {
                        path: "*",
                        element: "pages/404/page.tsx",
                    }
                ]
            });
            // 更新routerStore 在原基础添加新的菜单路由
            const routerList = useRouterStore.getState().router;
            useRouterStore.setState({
                router: routerList.concat(res.data.list)
            });
            router('/')
            return
        }
        message.error("菜单路由获取失败");
    }

    const onFinish: FormProps<FormItem>['onFinish'] = async (values) => {
        const {username, password} = values;
        const res = await login({username, password});
        if (res.code === 0) {
            setUser({
                token: res.data.token,
                userInfo: res.data.user
            });
            console.log(useUserStore().getState().token)
            if (useUserStore().getState().token) {
                getMenuData().then(() => {
                    message.success('登录成功');
                }).catch(() => {
                    message.error('登录失败');
                })
            }
        }
    }

    return (
        <div>
            <Form onFinish={onFinish}>
                <Form.Item<FormItem> name={"username"} rules={
                    [
                        {
                            required: true,
                            message: '请输入账号!',
                        }
                    ]
                }>
                    <Input placeholder={"Account"}/>
                </Form.Item>
                <Form.Item<FormItem> name={"password"} rules={
                    [
                        {
                            required: true,
                            message: '请输入密码!',
                        }
                    ]
                }>
                    <Input.Password placeholder={"Password"}/>
                </Form.Item>
                <Form.Item<FormItem>>
                    <Button className={"w-full"} htmlType={"submit"} type={"primary"}>Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
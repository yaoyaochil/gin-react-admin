import {Button, Form, FormProps, Input} from "antd";
import {message} from "@/shared/EscapeAntd.tsx";
import login from "@/api/base/login.ts";
import useUserStore from "@/store/userStore.ts";
import {useNavigate} from "react-router-dom";

type FormItem = {
    username: string;
    password: string;
}

export default function Login() {
    const setUser = useUserStore().setState;
    const router = useNavigate();

    const onFinish: FormProps<FormItem>['onFinish'] = async (values) => {
        const {username, password} = values;
        const res = await login({username, password});
        if (res.code === 0) {
            setUser({
                token: res.data.token,
                userInfo: res.data.user
            });
            router('/');
            message.success('登录成功');
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
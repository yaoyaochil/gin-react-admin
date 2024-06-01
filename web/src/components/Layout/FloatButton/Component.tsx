import {GithubOutlined, SettingOutlined,BgColorsOutlined} from "@ant-design/icons";
import {FloatButton} from "antd";
import {useState} from "react";

// 浮动按钮组件
export default function FloatButtonComponent() {
    const [floatButtonVisible, setFloatButtonVisible] = useState(false);
    return (
        <>
            <FloatButton.Group style={{
                position: 'fixed',
                right: 50,
                bottom: 100,
            }} open={floatButtonVisible} onClick={()=> setFloatButtonVisible(!floatButtonVisible)} icon={<SettingOutlined spin />} trigger="click">
                <FloatButton
                    icon={<GithubOutlined/>}
                    onClick={() => window.open('https://github.com/yaoyaochil/gin-react-admin')}
                />
                {/*主题配置*/}
                <FloatButton
                    icon={<BgColorsOutlined />}
                    onClick={() => {
                        console.log('主题配置')
                    }}
                />
            </FloatButton.Group>
        </>
    )
}
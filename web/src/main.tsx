import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN} theme={{
        components: {
            Card: {
                borderRadius: 0,
                headerBg: "#3875f6",
            },
        }
    }}>
        <App />
    </ConfigProvider>
)

import {Input} from "antd";
import {useState} from "react";


export default function SysMenu() {
    const [value, setValue] = useState('');
    return (
        <div>
            <h1>菜单管理</h1>
            <Input value={value} onChange={(e) => {
                setValue(e.target.value)
            }} />
        </div>
    )
}
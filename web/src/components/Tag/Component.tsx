import { CloseOutlined } from '@ant-design/icons';
import {Button} from "antd";

interface TagProps {
    tags: {
        id: number;
        name: string;
        color?: string | undefined;
        icon?: string | undefined;
    }[];
    selected?: number;
}

export default function Tag(props:TagProps) {
    return (
        <div className={'w-auto flex gap-2'}>
            {props.tags.map((tag) => (
                <span key={tag.id} className={`rounded inline-flex justify-center items-center w-auto border-2 ${props.selected && props.selected === tag.id?'border-blue-500 text-blue-500':''} px-2 py-1 gap-1 cursor-pointer group transition-all duration-300`}>
                    {tag.icon && <i className={tag.icon}></i>}
                    {tag.name}
                    <span className={`p-0 opacity-0 w-0 rounded-full group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ${props.selected && props.selected === tag.id?'w-4 opacity-100':''}`}>
                        <Button className={"inline hover:text-white hover:bg-gray-700 transition-all duration-300 p-0 m-0 group"} type="text" icon={<CloseOutlined className={`${props.selected && props.selected === tag.id?'text-blue-500':''} hover:text-white`} style={{fontSize:'12px',padding:0}} />} size="small" shape="circle" />
                    </span>
                </span>
            ))}
        </div>
    )
}
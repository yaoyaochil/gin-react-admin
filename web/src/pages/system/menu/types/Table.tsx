import {ColumnsType} from "antd/es/table";
import {RouterType} from "@/store/routerStore.tsx";
import {createIcon} from "@/shared/componentLoad.tsx";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {SetStateAction} from "react";

interface ColumnsProps {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    setEditData: React.Dispatch<React.SetStateAction<RouterType | undefined>>
    setEditType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
}

export const getColumns = (props:ColumnsProps) => {

    const HandleClick = (record:RouterType,type:SetStateAction<'add' | 'edit'>) => {
        switch (type) {
            case 'add':
                props.setEditData(record);
                props.setEditType('add');
                props.setVisible(true);
                break;
            case 'edit':
                props.setEditData(record);
                props.setEditType('edit');
                props.setVisible(true);
                break;
        }
    }

    const columns: ColumnsType<RouterType> = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: '展示名称',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (text) => {
                if (text) {
                    return createIcon(text)
                }
                return '无';
            }
        },
        {
            title: '路由',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '隐藏',
            dataIndex: 'hidden',
            key: 'hidden',
            render: (text) => {
                return text ? '是' : '否';
            }
        },
        {
            title: '排序',
            dataIndex: 'orderNum',
            key: 'orderNum',
        },
        {
            title: '组件路径',
            dataIndex: 'element',
            key: 'element',
            render: (text) => {
                return text || '无';
            }
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 400,
            render: (_,record) => (
                <div className={'flex gap-1'}>
                    <Button type={'link'} icon={<PlusOutlined/>} onClick={()=>HandleClick(record,'add')}>添加子菜单</Button>
                    <Button type={'link'} onClick={() => HandleClick(record,'edit')}>编辑</Button>
                    <Button type={'link'} danger>删除</Button>
                </div>
            ),
        }
    ];
    return columns;
}
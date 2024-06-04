import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { RouterType } from "@/store/routerStore.tsx";
import { useEffect, useState } from "react";
import { getMenuList } from "@/api/system/sysMenus.ts";
import { message } from "@/shared/EscapeAntd.tsx";
import { PlusOutlined } from "@ant-design/icons";
import {createIcon} from "@/shared/componentLoad.tsx";

export default function SysMenu() {
    const [data, setData] = useState<RouterType[]>([]);

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
            render: (text, record) => (
                <div className={'flex gap-1'}>
                    <Button type={'link'} icon={<PlusOutlined/>}>添加子菜单</Button>
                    <Button type={'link'} >编辑</Button>
                    <Button type={'link'} danger>删除</Button>
                </div>
            ),
        }
    ];

    const getData = async () => {
        const res = await getMenuList({ page: 1, pageSize: 1000 });
        if (res.code === 0) {
            setData(res.data.list);
            return;
        }
        message.error('获取菜单列表失败');
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={'w-full h-full bg-white flex flex-col gap-3 p-4 rounded'}>
            <div>
                <Button type={'primary'}>新增根菜单</Button>
            </div>
            <div className={'flex-1 w-full'}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="ID"
                    expandable={{
                        childrenColumnName: 'children', // 设置嵌套子表格的字段名
                    }}
                />
            </div>
        </div>
    );
}
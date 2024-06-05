import { Button, Table } from "antd";
import { RouterType } from "@/store/routerStore.tsx";
import {useEffect, useRef, useState} from "react";
import { getMenuList } from "@/api/system/sysMenus.ts";
import { message } from "@/shared/EscapeAntd.tsx";
import MenuEditor from "@/pages/system/menu/Components/Editor.tsx";
import {getColumns} from "@/pages/system/menu/types/Table.tsx";

export default function SysMenu() {
    const [data, setData] = useState<RouterType[]>([]);
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState<RouterType | undefined>(undefined);
    const [editType, setEditType] = useState<'add' | 'edit'>('add');
    const columns = getColumns({setVisible,setEditType,setEditData});
    const [scrollHeight, setScrollHeight] = useState(400); // initial value
    const TableRef = useRef(null);

    // 获取菜单列表
    const getData = async () => {
        const res = await getMenuList({ page: 1, pageSize: 999 });
        if (res.code === 0) {
            setData(res.data.list);
            return;
        }
        message.error('获取菜单列表失败');
    };

    const addRootMenu = () => {
        setEditData({
            ID: 0,
            label: '',
            path: '',
            icon: '',
            hidden: false,
            parentId: 0,
            orderNum: 0,
            children: []
        });
        setEditType('add');
        setVisible(true);
    }


    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setScrollHeight(entry.contentRect.height - 150);
            }
        });

        if (TableRef.current) {
            resizeObserver.observe(TableRef.current);
        }

        return () => {
            if (TableRef.current) {
                resizeObserver.unobserve(TableRef.current);
            }
        };
    }, []);

    // 当page或pageSize变化时，重新获取数据
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={'w-full h-full bg-white flex flex-col gap-3 p-4 rounded'}>
            <MenuEditor type={editType} data={editData} open={visible} onCanceled={()=>setVisible(false)} />
            <div>
                <Button type={'primary'} onClick={addRootMenu}>新增根菜单</Button>
            </div>
            <div ref={TableRef} className={'flex-1 w-full'}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="ID"
                    scroll={{y:scrollHeight,x:undefined}}
                    expandable={{
                        childrenColumnName: 'children', // 设置嵌套子表格的字段名
                        defaultExpandedRowKeys: [1], // 默认展开的行
                        // 只有当数据中children字段长度大于0时，才会展示子表格
                        rowExpandable: (record) => {
                            // 获取当前行的数据
                            return !!(record.children && record.children.length > 0);
                        }
                    }}
                    pagination={false}
                />
            </div>
        </div>
    );
}
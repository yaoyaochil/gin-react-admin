import {Button, Cascader, Drawer, Form, FormProps, Input, InputNumber, Select} from "antd";
import {RouterType, useRouterStore} from "@/store/routerStore.tsx";
import {useEffect} from "react";
import * as AntdIcon from '@ant-design/icons';
import {createIcon} from "@/shared/componentLoad.tsx";
import {createMenu, updateMenu} from "@/api/system/sysMenus.ts";
import {message} from "@/shared/EscapeAntd.tsx";
interface MenuEditorProps {
    type?: 'add' | 'edit';
    data?: RouterType;
    open: boolean;
    onCanceled?: () => void;
}

export default function MenuEditor(props: MenuEditorProps) {
    const form = Form.useForm<RouterType>()[0];
    const menuData = useRouterStore((state) =>
        state.router.filter((route) => route.path !== '/login' && route.path !== '*')
    );
    const onFinish: FormProps<RouterType>['onFinish'] = async (values) => {
        switch (props.type) {
            case 'add':
                const createResponse = await createMenu(values);
                if (createResponse.code === 0) {
                    form.resetFields();
                    props.onCanceled && props.onCanceled();
                    message.success('创建成功');
                    return;
                }
                message.error('创建失败');
                break;
            case 'edit':
                const updateResponse = await updateMenu({
                    ID: props.data && props.data.ID,
                    ...values
                });
                if (updateResponse.code === 0) {
                    form.resetFields();
                    props.onCanceled && props.onCanceled();
                    message.success('更新成功 请刷新页面');
                    return;
                }
                message.error('更新失败');
                break;
        }
    }
    const displayRender = (labels: string[]) => labels[labels.length - 1];

    useEffect(() => {
        if (props.data && props.type === 'add') {
            console.log(props.data)
            form.setFieldValue('parentId', props.data.ID)
        }
        if (props.data && props.type === 'edit') {
            form.setFieldsValue(props.data)
        }
    }, [props.data, props.type]);

    return (
        <Drawer open={props.open} title={props.type === 'add' ? '创建菜单' : '编辑菜单'} width={'40%'}
                placement={'right'} onClose={()=> {
            form.resetFields();
            props.onCanceled && props.onCanceled();
        }}>
            <Form form={form} onFinish={onFinish}>
                <div className={'w-full h-full grid grid-cols-3 gap-3'}>
                    <Form.Item<RouterType> label={'菜单名称'} name={'label'} rules={[{required:true,message:'请输入菜单名'}]}>
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item<RouterType> label={'图标'} name={'icon'} initialValue={'DashboardOutlined'}>
                        <Select showSearch>
                            {
                                Object.keys(AntdIcon).map((key) => {
                                    if (key.includes('Outlined')) {
                                        return (
                                            <Select.Option value={key} key={key}>
                                                <div className={'flex gap-2'}>
                                                    {createIcon(key)}
                                                    <span className={'text-xs'}>{key}</span>
                                                </div>
                                            </Select.Option>
                                        )
                                    }
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item<RouterType> label={'路由'} name={'path'} rules={[{required:true,message:'请输入路由'}]}>
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item<RouterType> label={'父节点ID'} name={'parentId'}>
                        <Cascader
                            options={menuData}
                            fieldNames={{label: 'label', value: 'ID'}}
                            changeOnSelect
                            expandTrigger="hover"
                            displayRender={displayRender}
                            onChange={(e) => {
                                if (e.length > 0) {
                                    form.setFieldValue('parentId', e[e.length - 1])
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item<RouterType> label={'隐藏'} name={'hidden'} initialValue={false}>
                        <Select>
                            <Select.Option value={true}>是</Select.Option>
                            <Select.Option value={false}>否</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item<RouterType> label={'KeepAlive'} name={'keepAlive'} initialValue={false}>
                        <Select>
                            <Select.Option value={true}>是</Select.Option>
                            <Select.Option value={false}>否</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item<RouterType> label={'排序'} name={'orderNum'} initialValue={0} className={'col-span-1'}>
                        <InputNumber type="number" className={'w-full'}/>
                    </Form.Item>
                    <Form.Item<RouterType>
                        label={'组件路径'}
                        name={'element'}
                        className={'col-span-2'}
                        extra={<span className={'text-gray-400'}>示例:pages/dashboard/page.tsx 或 留空</span>}
                    >
                        <Input placeholder={'组件路径'}/>
                    </Form.Item>
                </div>
                <Form.Item>
                    <div className={'w-full flex justify-end gap-5'}>
                        <Button type={'default'} onClick={props.onCanceled}>取消</Button>
                        <Button type={'primary'} htmlType={'submit'}>提交</Button>
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Space, Row, Col, Card, Input, Button, Modal, message, Tabs } from 'antd';
import { useRequest, history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';

import FormBuilder from '../builder/FormBuilder';
import ActionBuiler from '../builder/ActionBuilder';
import styles from '../index.less';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';

export default function Page() {
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const [clickBtnName, setClickBtnName] = useState("");

    const modelUrl = '/api/admins/1247'

    //查询接口
    const init = useRequest<{ data: BasicListApi.PageData }>(`/antd/${modelUrl}?X-API-KEY=antd`, {
        manual: true,
        onError: () => {
            message.error({
                content: "接口错误",
                key: 'process',
                duration: 20
            });
        }
    });
    //接口 编辑保存
    const request = useRequest(
        (values) => {
            message.loading({
                content: "loading",
                key: 'process',
                duration: 20
            });
            const { uri, method, ...formValues } = values;
            return {
                url: `/antd/${uri}`,
                method: method,
                // body: JSON.stringify(formValues),
                data: {
                    ...submitFieldsAdaptor(formValues),
                    'X-API-KEY': 'antd',
                    // "create_time": moment(formValues.create_time).format(),
                    // "update_time": moment(formValues.update_time).format(),
                },
            };
        },
        {
            //初始化时不自动调用请求
            manual: true,
            onSuccess: (data) => {
                if (data && data.success) {
                    message.success({
                        content: data.message,
                        key: 'process',
                        duration: 20
                    });
                    //   cancelMode(true);
                }
            },
            onError: (error) => {
                message.error({
                    content: error,
                    key: 'process',
                    duration: 20
                });

            },
            //onSuccess 默认只返回data，处理成返回所有
            formatResult: (res: any) => {
                return res;
            }
        },
    );
    //初始化加载
    useEffect(() => {
        init.run();
    }, []);
    //设置
    useEffect(() => {
        if (init.data) {
            form.setFieldsValue(setFieldsAdaptor(init.data));
        }
    }, [init.data]);
    //按钮处理
    const actionHandler = (action: BasicListApi.Action, _: any, btnText: string) => {
        switch (action.action) {
            case 'submit':
                // setUri("/antd/" + action.uri);
                // setMethod(action.method);
                setClickBtnName(btnText);
                form.setFieldsValue({ uri: action.uri, method: action.method });
                form.submit();
                break;
            case 'cancel':
                history.goBack();
                break;
            case 'reset':
                // console.log(init.data?.layout.tabs[0].data.filter(item => item.disabled != true).map(i => i.key));
                let fields: string[] = [];
                init.data?.layout.tabs[0].data.forEach(item => item.disabled != true && fields.push(item.key))
                // form.setFieldsValue({ groups: [] });
                form.resetFields();
                break;
            default:
                break;
        }
    };
    //表单提交
    const onFinish = (values: any) => {
        // setMethod(init.data?.layout.actions[0].data[3].method || "");
        // setBody(JSON.stringify(values));

        request.run(values);
    };
    //foottabbar
    const batchToolBar = () => {
        return (<Space> {"test"}</Space>)
    }


    //编辑弹窗布局
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    return (
        <PageContainer>
            <Row>
                <Col xs={18} sm={15}>
                    <Tabs type="card" tabBarStyle={{ marginBottom: "0px" }}>
                        <TabPane tab="Tab Title 1" key="1">
                            <Card>
                                <Form
                                    form={form}
                                    {...layout}
                                    onFinish={onFinish}
                                    initialValues={{
                                        create_time: moment(),
                                        update_time: moment(),
                                        status: false,
                                        username: init.data?.dataSource.username,
                                    }}
                                    // 弹框默认高度
                                    style={{ height: init.loading ? document.body.clientHeight * .35 : 'auto' }}
                                >
                                    {
                                        //加载中不显示form表单
                                        !init.loading ?
                                            FormBuilder(init.data?.layout.tabs[0].data || []) : null}
                                    <Form.Item name="uri" key="uri" hidden>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="method" key="method" hidden>
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Card>
                        </TabPane>
                        <TabPane tab="Tab Title 2" key="2">
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                        </TabPane>
                        <TabPane tab="Tab Title 3" key="3">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col xs={6} sm={9}>
                    <Card className={styles.cardToolbar}>
                        <Space>
                            {
                                !init.loading ?
                                    ActionBuiler(init.data?.layout.actions[0].data, actionHandler, null, request.loading, clickBtnName)
                                    : null
                            }
                        </Space>
                    </Card>
                </Col>
            </Row>

            <FooterToolbar extra={batchToolBar()}></FooterToolbar>
        </PageContainer>
    )
}

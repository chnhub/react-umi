import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Space, Row, Col, Card, Input, Button, Modal, message, Tabs } from 'antd';
import { useRequest, history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';

import FormBuilder from '../builder/FormBuilder';
import ActionBuiler from '../builder/ActionBuilder';
import styles from '../index.less';

export default function Page() {
    const { TabPane } = Tabs;
    const [form] = Form.useForm();

    const modelUrl = '/api/admins/1247'


    useEffect(() => {
        init.run();
    }, []);
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
                                    // onFinish={onFinish}
                                    initialValues={{
                                        create_time: moment(),
                                        update_time: moment(),
                                        status: true,
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
                                    ActionBuiler(init.data?.layout.actions[0].data, null, undefined, true, 'test')
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

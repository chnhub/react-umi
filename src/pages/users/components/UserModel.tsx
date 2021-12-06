import React,{useEffect} from 'react'
import { Table, Tag, Space, Modal, Button, Form, Input } from 'antd';

const UserModel = (props) => {
    const {visible, record, closeHandler, onFinish} = props
    const [form] = Form.useForm();

    //函数生命周期
    useEffect(()=>{
        // debugger
        form.setFieldsValue(record);
        if(record ===undefined){
            form.resetFields();
        }
    },[visible]);

    const onOk = (values)=> {
        form.submit();
    }

    const onFinishFailed = (error)=> {
        alert(JSON.stringify(error))
    }
    return (
        <div>
            {/* forceRender 解决错误提示Instance created by `useForm` is not connected   */}
            <Modal title="Basic Modal" forceRender visible={visible} onOk={onOk} onCancel={closeHandler}>

                {/* {JSON.stringify(record)} */}
                <div>
                    <Form name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Age" name="age">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                            <Input />
                        </Form.Item>
                        <Form.Item label="CreateTime" name="createtime">
                            <Input />
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </div>
    )
}
export default UserModel;
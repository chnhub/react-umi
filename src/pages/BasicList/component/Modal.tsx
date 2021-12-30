import { useEffect, useState } from 'react';
import { Form, Modal as AntdModal, Input, message, DatePicker, Row, Col } from 'antd';
import { useRequest } from 'umi';
import FormBuilder from '../builder/FormBuilder';
import ActionBuiler from '../builder/ActionBuilder';
import moment from 'moment';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';
const Modal = ({
  modVisible,
  cancelMode,
  modelUrl
}: {
  modVisible: any;
  cancelMode: any;
  modelUrl: any;
}) => {
  const [form] = Form.useForm();
  // const [method, setMethod] = useState("");
  // const [body, setBody] = useState("");
  // const [uri, setUri] = useState("")
  // const [visible, setVisible] = useState(modVisible);
  const [clickBtnName, setClickBtnName] = useState("");
  const [formData, setFormData]: [any, any] = useState({});
  //查询接口
  const init = useRequest<{ data: BasicListApi.PageData }>(`/antd/${modelUrl}?X-API-KEY=antd`, {
    manual: true,
    onError: () => {

      message.error({
        content: "testsetsetsetse",
        key: 'process',
        duration: 20
      });
      cancelMode();
    }
  });

  //接口 编辑
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
          cancelMode(true);
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


  //关闭时不重新获取
  useEffect(() => {
    if (modVisible) {
      form.resetFields();
      init.run();
    }
  }, [modVisible]);
  //编辑
  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
      setFormData(init.data);
    }
  }, [init.data]);

  //提交
  const onFinish = (values: any) => {
    // setMethod(init.data?.layout.actions[0].data[3].method || "");
    // setBody(JSON.stringify(values));
    request.run(values);
  };
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
        cancelMode();
        break;

      default:
        break;
    }
  };

  //编辑弹窗布局
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <AntdModal
        title={init.data?.layout.tabs[0].title}
        visible={modVisible}
        onOk={undefined}
        onCancel={() => { cancelMode(); }}
        maskClosable={false}
        footer={
          <div>

            <div>
              <label>更新时间：</label>
              {/* <DatePicker size={"small"} showTime disabled={true} value={formData?.dataSource?.update_time && moment(formData.dataSource.update_time)} /> */}
              <label>{formData?.dataSource?.update_time && moment(formData.dataSource.update_time).format('YYYY-MM-DD HH:mm:ss')}</label>
            </div>

            <div>
              {ActionBuiler(init.data?.layout.actions[0].data, actionHandler, undefined, request.loading, clickBtnName)}
            </div>

          </div>
        }>
        <Form
          form={form}
          {...layout}
          onFinish={onFinish}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
        >
          {FormBuilder(init.data?.layout.tabs[0].data || [])}
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
// {
//   if (data.layout.tabs && data.dataSource) {
//     const result = {};
//     data.layout.tabs.forEach((tab) => {
//       tab.data.forEach((field) => {
//         switch (field.type) {
//           case "datetime":
//             // field.key = 'create_time'
//             result[field.key] = moment(data.dataSource[field.key]);
//             break;
//         }
//       });
//     });
//     return result;
//   }
//   return {};
// }

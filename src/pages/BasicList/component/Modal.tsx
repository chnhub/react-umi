import React, { useEffect, useState } from 'react'
import { Form, Modal as AntdModal } from 'antd'
import { useRequest } from '_umi@3.5.20@umi'
import FormBuilder from '../builder/FormBuilder';
import ActionBuiler from '../builder/ActionBuilder';
import moment from 'moment';
const Modal = ({
  modVisible,
  cancelMode,
  modelUrl
}: {
  modVisible: any,
  cancelMode: any,
  modelUrl: any
}) => {
  const [form] = Form.useForm();

  const init = useRequest<{ data: PageApi.Data }>(`${modelUrl}`)
  // const [visible, setVisible] = useState(modVisible);
  // console.log("init.data", init.data);
  //关闭时不重新获取
  useEffect(() => {
    if (modVisible) {
      init.run();
    }
  }, [modVisible]);

  const setFieldsAdaptor = (data: PageApi.Data) => {
    if (data.layout.tabs && data.dataSource) {
      console.log("setFieldsAdaptor", data);

      const result = {};
      data.layout.tabs.forEach((tab) => {
        debugger
        console.log(tab);

        tab.data.forEach((field) => {
          switch (field.type) {
            case "datetime":
              // field.key = 'create_time'
              result[field.key] = moment(data.dataSource[field.key]);
              break;
          }
        });
      });
      return result;
    }
    return {};
  }
  //编辑
  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
    }
  }, [init.data]);

  //布局
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <div>
      <AntdModal
        title={init.data?.layout.tabs[0].title}
        visible={modVisible}
        onOk={undefined}
        onCancel={cancelMode}
        footer={ActionBuiler(init.data?.layout.actions[0].data)}
      ><Form form={form} {...layout}>{FormBuilder(init.data?.layout.tabs[0].data || [])}</Form></AntdModal>
    </div>
  )
}

export default Modal
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

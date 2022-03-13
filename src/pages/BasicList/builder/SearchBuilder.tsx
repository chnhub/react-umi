import { DatePicker, Form, Input, Switch, TreeSelect, Select, Col } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const SearchBuilder = (data: any) => {
  return (
    <div>
      {
        (data || []).map((item) => {
          switch (item.type) {
            case 'text':
              return (
                <Col span={6}>
                  <Form.Item key={item.key} label={item.title} name={item.key}>
                    <Input disabled={item.disabled} />
                  </Form.Item>
                </Col>
              );
              break;
            case 'datetime':
              if (item.key !== 'update_time') {
                return (
                  <Col span={6}>
                    <Form.Item key={item.key} label={item.title} name={item.key}>
                      <RangePicker disabled={item.disabled} />
                    </Form.Item>
                  </Col>
                );
              }
              break;
            case 'tree':
              return (
                <Form.Item key={item.key} label={item.title} name={item.key}>
                  <TreeSelect treeData={item.data} disabled={item.disabled} treeCheckable />
                </Form.Item>
              );
              break;
            case 'switch':
            // console.log('switch', item);

            // return (
            //   <Form.Item key={item.key} label={item.title} name={item.key} valuePropName="checked">
            //     <Select disabled={item.disabled}>{
            //       item?.data?.map((i: any) => {
            //         return (<Option key={i.value} value={i.value}>{i.title}</Option>)
            //       })
            //     }</Select>
            //   </Form.Item>
            // );
            // break;
            case 'select':
              return (
                <Form.Item key={item.key} label={item.title} name={item.key} valuePropName="checked">
                  <Select disabled={item.disabled}>{
                    item?.data?.map((i: any) => {
                      return <Option key={i.value} value={i.value}>{i.title}</Option>
                    })
                  }</Select>
                </Form.Item>
              );
              break;
            default:
              return null;
              break;
          }
        })
      }
    </div>
  )
}
export default SearchBuilder;

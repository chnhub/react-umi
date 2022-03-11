import { DatePicker, Form, Input, Switch, TreeSelect, Select } from 'antd';

const { Option } = Select;
const SearchBuilder = (data: any) => {
    return (
        <div>
            {
                (data || []).map((item) => {
                    switch (item.type) {
                        case 'text':
                            return (
                                <Form.Item key={item.key} label={item.title} name={item.key}>
                                    <Input disabled={item.disabled} />
                                </Form.Item>
                            );
                            break;
                        case 'datetime':
                            if (item.key !== 'update_time') {
                                return (
                                    <Form.Item key={item.key} label={item.title} name={item.key}>
                                        <DatePicker showTime disabled={item.disabled} />
                                    </Form.Item>
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
                            return (
                                <Form.Item key={item.key} label={item.title} name={item.key} valuePropName="checked">
                                    <Select disabled={item.disabled}>{
                                        item?.data?.map((i: any) => {
                                            return (<Option value={i.value}>{i.title}</Option>)
                                        })
                                    }</Select>
                                </Form.Item>
                            );
                            break;
                        case 'select':
                            return (
                                <Form.Item key={item.key} label={item.title} name={item.key} valuePropName="checked">
                                    <Select disabled={item.disabled}>{
                                        item?.data?.map((i: any) => {
                                            return (<Option value={i.value}>{i.title}</Option>)
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
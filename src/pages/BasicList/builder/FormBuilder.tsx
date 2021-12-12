import React from 'react'
import { Button, DatePicker, Form, Input, Switch, TreeSelect } from 'antd'

function FormBuilder(data: PageApi.Datum[]) {

  return (
    <div>
      {/* <Form> */}
      {
        (data || []).map((item) => {
          switch (item.type) {
            case "text":
              return (
                <Form.Item key={item.key} label={item.title} name={item.key}>
                  <Input disabled={item.disabled} />
                </Form.Item>
              )
              break;
            case "datetime":
              return (
                <Form.Item key={item.key} label={item.title} name={item.key}>
                  <DatePicker showTime disabled={item.disabled} />
                </Form.Item>
              )
              break;
            case "tree":
              return (
                <Form.Item key={item.key} label={item.title} name={item.key}>
                  <TreeSelect treeData={item.data} disabled={item.disabled} />
                </Form.Item>
              )
              break;
            case "switch":
              return (
                <Form.Item key={item.key} label={item.title} name={item.key}>
                  <Switch checked disabled={item.disabled} />
                </Form.Item>
              )
              break;

            default:
              return null;
              break;
          }

        })
      }
      {/* </Form> */}
    </div>
  )
}

export default FormBuilder

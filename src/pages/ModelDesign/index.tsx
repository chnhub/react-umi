import { SchemaForm, SchemaMarkupField as Field, FormEffectHooks } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { useRequest } from 'umi'
import { useEffect, useState } from 'react'
import { Button, Tag, Spin, Modal } from 'antd'
import { merge } from 'rxjs'
import DModal from './DModal'

const { onFormInit$, onFieldInputChange$, onFieldValueChange$, onFieldChange$ } = FormEffectHooks;

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const init = useRequest('antd/api/models/design/48', {
    manual: true,
  });
  useEffect(() => {
    if (init) {
      init.run();
    }
  }, []);
  // const { data, ...msg } = init?.data ? init?.data : { data: null };
  const data = init?.data?.data;
  return (
    <Spin spinning={init.loading}>

      <SchemaForm initialValues={data} actions={null} components={{ Tag, ArrayTable, Input, Select, Button, Checkbox }}
        effects={() => {
          onFieldValueChange$('fieldsCard.fields.*.data').subscribe(({ value }) => {
            console.log('value', value);
          });
          onFieldChange$('fieldsCard.fields.*.data').subscribe((a) => {
            console.log('onFieldChange', a)
            if (a?.active === true) {
              debugger
              setModalData(a?.value);
              setModalVisible(true)

            }
          });
        }}

      >
        <FormCard title="Basic">
          <Field name="routeName" x-component="Input" title="Route Name:" />
        </FormCard>
        <FormCard title="Fields" name='fieldsCard'>
          <Field
            // title="Fields"
            name="fields"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="name" x-component="Input" title="Name" />
              <Field enum={data?.fields.map((i: any) => i.type)} name="type" x-component="Select" title="Type" />
              <Field
                title="Data"
                name="data"
                x-component="Button"
                x-component-props={{
                  children: 'Data',
                }}

              />
              <Field name="listSorter" x-component="Checkbox" title="List Sorter" />
              <Field name="hideInColumn" x-component="Checkbox" title="Hide InColumn" />
              <Field name="editDisabled" x-component="Checkbox" title="Edit Disabled" />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="List Action">
          <Field
            // title="Fields"
            name="listAction"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.listAction.map((i: any) => i.type)} />
              <Field name="action" x-component="Select" title="Action" enum={data?.listAction.map((i: any) => i.action)} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Add Action">
          <Field
            // title="Fields"
            name="addAction"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.addAction.map((i: any) => i.type)} />
              <Field name="action" x-component="Select" title="Action" enum={data?.addAction.map((i: any) => i.action)} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Edit Action">
          <Field
            // title="Fields"
            name="editAction"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.editAction.map((i: any) => i.type)} />
              <Field name="action" x-component="Select" title="Action" />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>
        <FormCard title="Table Toolbar">
          <Field
            // title="Fields"
            name="tableToolbar"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.tableToolbar.map((i: any) => i.type)} />
              <Field name="action" x-component="Select" title="Action" enum={data?.tableToolbar.map((i: any) => i.action)} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>
        <FormCard title="Batch Toolbar">
          <Field
            // title="Fields"
            name="batchToolbar"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.batchToolbar.map((i: any) => i.action)} />
              <Field name="action" x-component="Select" title="Action" enum={data?.batchToolbar.map((i: any) => i.action)} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>
        <FormCard title="Batch Toolbar - Trashed">
          <Field
            // title="Fields"
            name="batchToolbarTrashed"
            maxItems={5}
            type="array"
            x-component="ArrayTable"
            x-component-props={{
              operationsWidth: "20%",
              operations: {
                title: '操作'
              },
              // draggable: true // 拖动禁用
            }}
          ><Field type='object'>
              <Field name="title" x-component="Input" title="Title" />
              <Field name="type" x-component="Select" title="Type" enum={data?.batchToolbarTrashed.map((i: any) => i.action)} />
              <Field name="action" x-component="Select" title="Action" enum={data?.batchToolbarTrashed.map((i: any) => i.action)} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>
      </SchemaForm>
      <DModal
        modalVisible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
        }}
        modalData={modalData}
      />
    </Spin >
  )
}
export default Index;

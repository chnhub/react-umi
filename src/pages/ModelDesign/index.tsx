import { SchemaForm, SchemaMarkupField as Field, FormEffectHooks, createFormActions, createAsyncFormActions, FormButtonGroup } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { useRequest } from 'umi'
import { useEffect, useState } from 'react'
import { Button, Tag, Spin, Modal } from 'antd'
import { FooterToolbar } from '@ant-design/pro-layout'

import { merge } from 'rxjs'
import DModal from './DModal'
import * as enums from './enums'

const { onFormInit$, onFieldInputChange$, onFieldValueChange$, onFieldChange$ } = FormEffectHooks;

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const init = useRequest('antd/api/models/design/37', {
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

      <SchemaForm initialValues={data} actions={undefined} components={{ Tag, ArrayTable, Input, Select, Button, Checkbox }}
        effects={(_, { setFieldState }) => {
          onFieldValueChange$('fieldsCard.fields.*.type').subscribe((i) => {
            console.log(i);
            if (i.value === 'switch' || i.value === 'radio') {
              setFieldState(i.path.replace('type', 'data'), state => {
                state.editable = true;
              })
            } else {
              setFieldState(i.path.replace('type', 'data'), state => {
                state.editable = false;
              })
            }
          })
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
              <Field enum={enums.fieldType} name="type" x-component="Select" title="Type" />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.fieldType} />
              <Field name="action" x-component="Select" title="Action" enum={enums.buttonAction} />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.fieldType} />
              <Field name="action" x-component="Select" title="Action" enum={enums.buttonAction} />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.buttonType} />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.buttonType} />
              <Field name="action" x-component="Select" title="Action" enum={enums.buttonAction} />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.buttonType} />
              <Field name="action" x-component="Select" title="Action" enum={enums.buttonAction} />
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
              <Field name="type" x-component="Select" title="Type" enum={enums.buttonType} />
              <Field name="action" x-component="Select" title="Action" enum={enums.buttonAction} />
              <Field name="uri" x-component="Checkbox" title="Uri" />
              <Field name="method" x-component="Input" title="Method" />
            </Field>
          </Field>
        </FormCard>
        <FooterToolbar extra={<Button
          type="primary"
          onClick={() => {
            // modelDesignAction.submit();
          }}
        // loading={submitLoading}
        >
          Submit
          </Button>}></FooterToolbar>
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

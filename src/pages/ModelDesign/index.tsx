import { SchemaForm, SchemaMarkupField as Field, FormEffectHooks, createFormActions, createAsyncFormActions, FormButtonGroup } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { useRequest, useLocation } from 'umi'
import { useEffect, useState } from 'react'
import { Button, Tag, Spin, Modal, message } from 'antd'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'

import { merge } from 'rxjs'
import DModal from './DModal'
import * as enums from './enums'

const { onFormInit$, onFieldInputChange$, onFieldValueChange$, onFieldChange$ } = FormEffectHooks;
const designAction = createFormActions();
const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const location = useLocation();
  //antd/api/models/design/37
  const url = location.pathname.replace('basic-list', 'antd').replace('model-design', 'design');
  const init = useRequest(url, {
    manual: true,
  });
  //编辑接口
  const edit = useRequest((data) => ({
    // 这里的data应该是run传进来的
    url: url,
    method: "put",
    // body: JSON.stringify(data),
    data: { data: data }
    // headers:{
    //     'Content-Type': 'application/json;charset=utf-8'
    // }
  }),
    {
      manual: true,
      formatResult: (data) => {
        return data;
      },
    });
  useEffect(() => {
    if (init) {
      init.run().then((res) => {
        designAction.setFormState((state) => {
          state.values = res?.data;
        });
      });
    }
  }, [location, reload]);

  const onSubmit = (values: any) => {
    setSubmitLoading(true);
    message.loading({ content: 'Processing...', key: 'process', duration: 0 });
    // const editr = edit.run(values);

    edit.run(values).then((res) => {
      if (res?.success === true) {
        message.success({ content: res.message, key: 'process' });
      }
    }).catch().finally(() => {
      setSubmitLoading(false);
      // setReload(!reload);
    });

    // const updateData = async () => {
    //   try {
    //     const res = await request(
    //       `${location.pathname.replace('/basic-list/api/models/model-design', '')}`,
    //       {
    //         method: 'put',
    //         data: {
    //           data: values,
    //         },
    //       },
    //     );
    //     if (res.success === true) {
    //       message.success({ content: res.message, key: 'process' });
    //       history.goBack();
    //       reFetchMenu();
    //     }
    //   } catch (error) {
    //     setSubmitLoading(false);
    //   }
    // };
    // updateData();
  };

  return (
    <PageContainer
      header={{
        title: 'design',
        // breadcrumb: {
        //   routes: [
        //     {
        //       path: '',
        //       breadcrumbName: 'model-list',
        //     },
        //     {
        //       path: '',
        //       breadcrumbName: 'design',
        //     }
        //   ],
        // },
      }}
    >
      <Spin spinning={init.loading}>
        <SchemaForm
          // initialValues={data}
          actions={designAction}
          onSubmit={onSubmit}
          components={{ Tag, ArrayTable, Input, Select, Button, Checkbox }}
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
              designAction.submit();
            }}
            loading={submitLoading}
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
    </PageContainer>
  )
}
export default Index;

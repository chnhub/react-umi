
import { request } from '@/.umi/plugin-request/request'
import { FooterToolbar } from '@ant-design/pro-layout'
import { SchemaForm, SchemaMarkupField as Field, FormEffectHooks, createFormActions, createAsyncFormActions, FormButtonGroup } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard, Submit } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { useEffect } from 'react'
import { Button } from '_antd@4.19.2@antd'
import { useRequest, history, useLocation } from 'umi';

import * as enums from './enums'

const Index = () => {
    //监控
    const { onFieldValueChange$, onFieldChange$ } = FormEffectHooks;
    //更改元素状态
    // const { setFieldState } = createFormActions();
    // const { setFieldState } = createAsyncFormActions();
    const init = useRequest('antd/api/models/design/37', {
        manual: true,
    });

    useEffect(() => {
        if (init) {
            init.run();
            console.log('init', init);
        }
    }, [])
    const data = init?.data?.data;

    return (
        <SchemaForm initialValues={data} actions={null} components={{ ArrayTable, Input, Select, Button, Checkbox }}
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
                onFieldChange$('fieldsCard.fields.*.data').subscribe((i) => {
                    console.log(i);
                });

            }}
            onSubmit={v => console.log(v)}
        >
            <FormCard title="Basic">
                <Field name="routeName" x-component="Input" title="Route Name:" />
            </FormCard>
            <FormCard title="Fields" name='fieldsCard'>
                <Field type="array"
                    // title=""
                    name="fields"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="name" x-component="Input" title="Name" />
                        <Field name="type" x-component="Select" title="Type" enum={enums.fieldType} />
                        <Field
                            title="Data"
                            name="data"
                            editable={false}
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
            <FormCard title="List Action" >
                <Field type="array"
                    // title=""
                    name="listAction"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="type" x-component="Select" title="Type" />
                        <Field name="action" x-component="Select" title="Action" />
                        <Field name="uri" x-component="Input" title="Uri" />
                        <Field name="method" x-component="Select" title="Method" />

                    </Field>
                </Field>
            </FormCard>
            <FormCard title="Edit Action">
                <Field type="array"
                    // title=""
                    name="editAction"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="type" x-component="Select" title="Type" />
                        <Field name="action" x-component="Select" title="Action" />
                        <Field name="uri" x-component="Input" title="Uri" />
                        <Field name="method" x-component="Select" title="Method" />
                    </Field>
                </Field>
            </FormCard>
            <FormCard title="Table Toolbar">
                <Field type="array"
                    // title=""
                    name="editAction"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="type" x-component="Select" title="Type" />
                        <Field name="action" x-component="Select" title="Action" />
                        <Field name="uri" x-component="Input" title="Uri" />
                        <Field name="method" x-component="Select" title="Method" />
                    </Field>
                </Field>
            </FormCard>
            <FormCard title="Batch Toolbar">
                <Field type="array"
                    // title=""
                    name="batchToolbar"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="type" x-component="Select" title="Type" />
                        <Field name="action" x-component="Select" title="Action" />
                        <Field name="uri" x-component="Input" title="Uri" />
                        <Field name="method" x-component="Select" title="Method" />
                    </Field>
                </Field>
            </FormCard>
            <FormCard title="Batch Toolbar - Trashed">
                <Field type="array"
                    // title=""
                    name="batchToolbarTrashed"
                    x-component="ArrayTable"
                    x-component-props={{
                        operationsWidth: '30%',
                        operations: {
                            title: '操作'
                        },
                        // draggable: true
                    }}>
                    <Field type="object">
                        <Field name="title" x-component="Input" title="Title" />
                        <Field name="type" x-component="Select" title="Type" />
                        <Field name="action" x-component="Select" title="Action" />
                        <Field name="uri" x-component="Input" title="Uri" />
                        <Field name="method" x-component="Select" title="Method" />
                    </Field>
                </Field>
            </FormCard>
            <FooterToolbar extra={<FormButtonGroup><Submit /></FormButtonGroup>}></FooterToolbar>
        </SchemaForm >

    )
}
export default Index;

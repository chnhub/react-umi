
import { request } from '@/.umi/plugin-request/request'
import { FooterToolbar } from '@ant-design/pro-layout'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { useEffect } from 'react'
import { Button } from '_antd@4.19.2@antd'
import { useRequest, history, useLocation } from 'umi';

const Index = () => {
    const init = useRequest('antd/api/models/design/48', {
        manual: true,
    });
    const { data, ...msg } = init.data;
    useEffect(() => {
        if (init) {
            init.run();
            console.log('init', init);
        }
    }, [])
    return (
        <SchemaForm actions={null} components={{ ArrayTable, Input, Select, Button, Checkbox }}>
            <FormCard title="Basic">
                <Field name="route" x-component="Input" title="Route Name:" />
            </FormCard>
            <FormCard title="Fields">
                <Field type="object"
                    // title=""
                    name="userList"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', name: 20 },
                        { title: 'joe', name: 21 }
                    ]}
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
                        <Field name="type" x-component="Select" title="Type" />
                        <Field
                            title="Data"
                            name="data"
                            x-component="Button"
                            x-component-props={{
                                children: 'Data',
                            }}
                        />
                        <Field name="listSorter" x-component="Checkbox" title="List Sorter" />
                        <Field name="hide" x-component="Checkbox" title="Hide InColumn" />
                        <Field name="edit" x-component="Checkbox" title="Edit Disabled" />
                    </Field>
                </Field>
            </FormCard>
            <FormCard title="List Action">
                <Field type="object"
                    // title=""
                    name="listAction"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', uri: 20 },
                        { title: 'joe', uri: 21 }
                    ]}
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
                <Field type="object"
                    // title=""
                    name="editAction"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', uri: 20 },
                        { title: 'joe', uri: 21 }
                    ]}
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
                <Field type="object"
                    // title=""
                    name="editAction"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', uri: 20 },
                        { title: 'joe', uri: 21 }
                    ]}
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
                <Field type="object"
                    // title=""
                    name="batchToolbar"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', uri: 20 },
                        { title: 'joe', uri: 21 }
                    ]}
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
                <Field type="batchToolbarTrashed"
                    // title=""
                    name="batchToolbar"
                    type="array"
                    x-component="ArrayTable"
                    default={[
                        { title: 'morally', uri: 20 },
                        { title: 'joe', uri: 21 }
                    ]}
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
            <FooterToolbar extra={<Button type='primary'>Submit</Button>}></FooterToolbar>
        </SchemaForm >

    )
}
export default Index;

// import { PageContainer } from '@ant-design/pro-layout';
// import React from 'react'

// const Index = () => {
//     return (
//         <PageContainer>

//             <div>
//                 hello,world
//             </div>
//         </PageContainer>

//     )
// }

// export default Index;

import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { Input, ArrayTable, Select, Checkbox, FormCard } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { Button } from '_antd@4.19.2@antd'
const Index = () => {
  return (
    <SchemaForm actions={null} components={{ ArrayTable, Input, Select, Button, Checkbox }}>
      <FormCard title="Basic">
        <Field name="route" x-component="Input" title="Route Name:" />
      </FormCard>
      <FormCard title="Fields">
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
      </FormCard>

    </SchemaForm>
  )
}
export default Index;

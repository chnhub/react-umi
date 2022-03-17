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
import { Input, ArrayTable } from '@formily/antd-components'
import 'antd/dist/antd.css'
const App = () => (
    <SchemaForm components={{ ArrayTable, Input }}>
        <Field
            title="用户列表"
            name="userList"
            maxItems={3}
            type="array"
            x-component="ArrayTable"
        >
            <Field type="object">
                <Field name="username" x-component="Input" title="用户名" />
                <Field name="age" x-component="Input" title="年龄" />
            </Field>
        </Field>
    </SchemaForm>
)

export default App;
import React,{useState} from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'umi';
import UserModel from './components/UserModel'

const index = (index) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
  const {dispatch, users, loading} = index;

  // console.log(data)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'CreateTime',
      key: 'createtime',
      dataIndex: 'createtime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{
            editHandler(record);
          }}>Edit</a>
          <a onClick={() => {
            showDeleteModel(record.id);
          }}>Delete</a>
        </Space>
      ),
    },
  ];
  //弹出编辑框
  const editHandler = (record)=>{
    setModalVisible(true);
    setRecord(record);
  }

  const closeHandler = () => {
    setModalVisible(false);
  }
  //提交
  const onFinish = (values)=> {
    if(!record){
      dispatch({
        type:"users/adduser",
        rowdata: {values}
      });
    }else{
      const id = record.id;
      dispatch({
        type:"users/edituser",
        rowdata: {id, values}
      });
    }

    setModalVisible(false);
  }
   //删除
   const deleteUser = (id)=> {
    // const id = record.id;
    // showWarning();
    dispatch({
      type:"users/deleteuser",
      rowdata: {id}
    });
    // setModalVisible(false);
  }
  const showDeleteModel = (id)=>{
    showWarning({onOk:deleteUser, data:id, title:"温馨提示！", context:"确认删除吗？"});
  }
  //提示框
  const showWarning = ({onOk, data, title, context, okText = "确认", cancelText = "取消"})=>{
    Modal.confirm({
      title: title,
      content: (
        <div>
          <p>{context}</p>
        </div>
      ),
      onOk() {onOk(data)},
      onCancel(){},
      okText: okText,
      cancelText: cancelText
    });
  }
  

  // const {users} = users;
  // const list = users.length ? users : null;
  return (
    <div className="list-table">
      {/* !!! setRecord为空时界面不重新渲染 */}
      <Button type="primary" onClick={()=>{setModalVisible(true);setRecord(undefined);}}>添加</Button>
      <Table columns={columns} dataSource={users.tabdata} rowKey="id" loading={loading.global}/>
      <UserModel 
        visible={modalVisible} 
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}/>
    </div>
  );
};
const mapStateToProps = ( par ) => {
console.log("🚀 ~ file: index.tsx ~ line 113 ~ mapStateToProps ~ par", par)
  
  const {users, loading} = par;
  return {
    users,
    loading
  };
};

export default connect(mapStateToProps)(index);

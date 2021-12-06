import request, {extend} from 'umi-request'
import {message} from 'antd'

const errorHandler = function(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    debugger
    if (error.response.status > 400) {
      message.error(error.data?error.data:error.message?error.message:error.message?error.message:"error");

    }
    console.log(error.response)
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
    message.error(error.message);
  }

  // throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
const userRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return request('/api/userdata', {
    method: 'get',
  }).then((response) => {
    return response;
  }).catch(() => {

  })

  // return data1;
};

export const updtaUser = async (par) => {
  const {id, values} = par
  return userRequest(`/api/userdata1/${id}`, {
    method: 'patch',
    data: values
  }).then((response) => {
    message.success("修改成功");
    return response;
  }).catch(() => {
    // message.error("修改失败");

  })

  // return data1;
};

export const deleteUser = async (par) => {
  const {id, values} = par
  return request(`/api/userdata/${id}`, {
    method: 'delete',
  }).then((response) => {
    message.success("删除成功");
    return response;
  }).catch(() => {

  })

  // return data1;
};

export const addUser = async (par) => {
  const {id, values} = par
  return request(`/api/userdata`, {
    method: 'post',
    data: values
  }).then((response) => {
    message.success("添加成功");
    return response;
  }).catch(() => {

  })

  // return data1;
};

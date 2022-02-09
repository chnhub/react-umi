import { useState, useEffect } from 'react';
import { Table, Space, Row, Col, Card, Pagination, Button, Modal, message, Form, Input } from 'antd';
import { useRequest, history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { SearchOutlined } from '@ant-design/icons';

import styles from './index.less';
import ColumnsBuilder from './builder/ColumnBuilder';
import ActionBuiler from './builder/ActionBuilder';
import MyModal from './component/Modal';

const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [pageQuery, setPageQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const [modVisible, setModVisible] = useState(false);
  const [modUrl, setModUrl] = useState('');
  const [SelectRows, setSelectRows] = useState([]);
  const [editRecord, setEditRecord] = useState([]);//选中cell的数据

  const init = useRequest<{ data: BasicListApi.ListData }>(
    `/antd/api/admins?X-API-KEY=antd${pageQuery}${sortQuery}`,
    // { manual: true, }
  );
  //通用接口 编辑
  const request = useRequest(
    (values) => {
      message.loading({
        content: "loading",
        key: 'process',
        duration: 20
      });
      const { uri, method, ...data } = values;
      return {
        url: `/antd/${uri}`,
        method: method,
        data: {
          ...data,
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      //初始化时不自动调用请求
      manual: true,
      onSuccess: (data) => {
        if (data && data.success) {
          message.success({
            content: data.message,
            key: 'process',
            duration: 20
          });
        }
      },
      onError: (error) => {
        message.error({
          content: error,
          key: 'process',
          duration: 20
        });

      },
      //onSuccess 默认只返回data，处理成返回所有
      formatResult: (res: any) => {
        return res;
      }
    },
  );

  useEffect(() => {
    //重新请求
    init.run();
  }, [sortQuery]);

  //添加model
  const addAction = () => {
    setModUrl('/api/admins/add1');
    setModVisible(true);
  };

  //编辑model
  const editAction = () => {
    // setModUrl('/antd/api/admins/240?X-API-KEY=antd');
    setModVisible(true);
  };
  //删除
  const deleteActon = (action: BasicListApi.Action, record: any) => {
    // const delItems = SelectRows && ([...SelectRows])
    // record && (delItems = [...record, delItems])
    let selectItems: any[] = [];
    if (SelectRows) selectItems = [].concat(SelectRows)
    if (record) selectItems = [].concat(record)
    const tabCol = ColumnsBuilder(init.data?.layout.tableColumn, actionHandler);
    Modal.confirm({
      title: `Are you sure delete this task?`,
      content: (
        <Table
          rowKey="id"
          columns={[tabCol[0], tabCol[1], tabCol[2]]}
          dataSource={selectItems}
          // pagination={false}
          loading={init.loading}
          size='small'
          pagination={false}
          scroll={{ y: document.body.clientHeight * .30 }}
        ></Table>),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        const requestData = {
          ids: selectItems.map((item: any) => item.id),
          // type: "delete"
          type: action.action,

        }
        request.run({ ...requestData, uri: "/api/admins/delete", method: "POST" });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //cell操作按钮事件
  const actionHandler = (_action: BasicListApi.Action, record: any) => {
    const { action, uri } = _action;
    switch (action) {
      case 'modal':
        const _uri1 = uri?.replace(/:\w+/g, (field) => {
          return record[field.replace(':', '')]
        });
        // const _uri = uri?.replace(/(?<=\/:)\w+/, (field) => {
        //   return record[field]
        // });
        setModUrl(_uri1 as string);
        setModVisible(true);
        break;
      case 'reload':
        init.refresh();
        break;
      case 'delete':
      case 'restore':
      case 'deletePermanently':
        deleteActon(_action, record);
        break;
      case 'page':
        const _uri = (uri || '').replace(/:\w+/g, (field) => {
          return record[field.replace(':', '')];
        });
        history.push(`/basic-list${_uri}`);
        break;
      default:
        break;
    }
  };
  //编辑弹窗布局
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const searchLayout = () => {
    return (
      <div>
        <Card className={styles.searchForm}>
          <Form >
            <Row >
              <Col  >
                <Form.Item label="ID:">
                  <Input />
                </Form.Item>
              </Col>
              <Form.Item label="Username:">
                <Input />
              </Form.Item>
              <Form.Item label="Groups:">
                <Input />
              </Form.Item>

              <Form.Item label="Display:">
                <Input />
              </Form.Item>

            </Row>
            <Row>
              <Col>
                <Form.Item label="Create Time:">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Card>
      </div>
    )
  };
  const beforeTableLayout = () => {
    return (

      <Row>
        <Col xs={24} sm={12}>
          <Button type="primary" onClick={addAction}>
            Add
          </Button>
          <Button type="primary" onClick={editAction}>
            Edit
          </Button>
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>          <Button type="primary" shape="circle" icon={<SearchOutlined />} />{ActionBuiler(init?.data?.layout?.tableToolBar, actionHandler)}</Space>
        </Col>
      </Row>
    );
  };

  //分页onchange事件
  const paginationChangeHandler = (_page: any, _pageSize: any) => {
    setPage(_page);
    setPer_page(_pageSize);
    setPageQuery(`&page=${_page}&per_page=${_pageSize}`);

  };

  const afetrTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init.data?.meta.total || 0}
            current={init.data?.meta.page || 1}
            pageSize={init.data?.meta.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total: number) => `Total ${total} items`}
            onChange={paginationChangeHandler}
          // onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };

  // 字段排序
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const desc = 'desc'; //倒序
    const asc = 'asc'; //正序
    // sort、order可合成一个state
    setSort(sorter.field);
    setOrder(sorter.order?.includes(desc) ? desc : sorter.order?.includes(asc) ? asc : '');

    setSortQuery(`&sort=${sorter.field}&order=${sorter.order?.includes(desc) ? desc : sorter.order?.includes(asc) ? asc : ''}`);
  };

  // 选择行
  const rowSelection = {
    selectedRowKeys: SelectRows.map((item: any) => item.id),
    onChange: (keys: any, rows: any) => {
      // setSelectRows(keys);
      setSelectRows(rows);
    }
  }

  //foottabbar
  const batchToolBar = () => {
    return SelectRows.length > 0 && (<Space> {ActionBuiler(init.data?.layout.batchToolBar, actionHandler)}</Space>)
  }
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          columns={ColumnsBuilder(init.data?.layout.tableColumn, actionHandler)}
          dataSource={init?.data?.dataSource}
          pagination={false}
          loading={init.loading}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
        {afetrTableLayout()}
      </Card>
      <MyModal
        modVisible={modVisible}
        cancelMode={(relaod = false) => {
          setModVisible(false);
          if (relaod) init.run();

        }}
        modelUrl={modUrl}
      ></MyModal>
      <FooterToolbar extra={batchToolBar()}></FooterToolbar>
    </PageContainer>
  );
};

export default Index;

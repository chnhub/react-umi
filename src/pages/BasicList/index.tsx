import { useState, useEffect } from 'react';
import { Table, Space, Row, Col, Card, Pagination, Button } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';
import ColumnsBuilder from './builder/ColumnBuilder';
import ActionBuiler from './builder/ActionBuilder';
import Modal from './component/Modal'

const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');

  const [modVisible, setModVisible] = useState(false);
  const [modUrl, setModUrl] = useState("");


  const init = useRequest<{ data: BasicListApi.Data }>(
    `/antd/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}&sort=${sort}&order=${order}`,
  );
  console.log(init);

  useEffect(() => {
    //重新请求
    init.run();
  }, [page, per_page, order, sort]);
  //添加model
  const addAction = () => {
    setModUrl("antd/admins/add?X-API-KEY=antd");
    setModVisible(true);
  }
  //编辑model
  const editAction = () => {
    setModUrl("antd/admins/240?X-API-KEY=antd");
    setModVisible(true);
  }
  const searchLayout = () => { };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          <Button type="primary" onClick={addAction}>Add</Button>
          <Button type="primary" onClick={editAction}>Edit</Button>
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>{ActionBuiler(init?.data?.layout?.tableToolBar)}</Space>
        </Col>
      </Row>
    );
  };

  //分页onchange事件
  const paginationChangeHandler = (_page: any, _pageSize: any) => {
    setPage(_page);
    setPer_page(_pageSize);
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
    setSort(sorter.field);
    setOrder(sorter.order?.includes(desc) ? desc : sorter.order?.includes(asc) ? asc : '');
  };
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          columns={ColumnsBuilder(init.data?.layout.tableColumn)}
          dataSource={init?.data?.dataSource}
          pagination={false}
          loading={init.loading}
          onChange={handleTableChange}
        />
        {afetrTableLayout()}
      </Card>
      <Modal modVisible={modVisible} cancelMode={() => { setModVisible(false) }} modelUrl={modUrl}></Modal>
    </PageContainer >
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { Button, Table, Space, Row, Col, Card, Pagination } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);

  const init = useRequest<{ data: BasicListApi.Data }>(
    `/antd/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );
  console.log(init);

  useEffect(() => {
    //重新请求
    init.run();
  }, [page, per_page]);

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            <Button type="primary">添加</Button>
            <Button type="primary">添加2</Button>
          </Space>
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
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          columns={[{ title: 'ID', dataIndex: 'id', key: 'id' }].concat(
            init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true) || [],
          )}
          dataSource={init?.data?.dataSource}
          pagination={false}
          loading={init.loading}
        />
        {afetrTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default Index;

import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Space, Row, Col, Card, Pagination } from 'antd';
import { useRequest } from "umi"
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
const index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);

  const init = useRequest<{ data: BasicListApi.Data }>(`https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`);
  console.log(init);

  useEffect((params) => {
    init.run();
  }, [page, per_page]);

  const searchLayout = () => { };
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

  const paginationChangeHandler = (_page: any, _pageSize: any) => {
    setPage(_page);
    setPer_page(_pageSize)
  }
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
            showTotal={(total) => `Total ${total} items`}
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
          columns={init?.data?.layout?.tableColumn.filter((item: any) => {
            return item.hideInColumn !== true;
          })}
          dataSource={init?.data?.dataSource}
          pagination={false}
          loading={init.loading}
        />
        {afetrTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default index;

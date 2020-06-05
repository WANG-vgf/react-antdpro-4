import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Pagination, Button, Popconfirm, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

interface FinanceProps {
  dispatch: Dispatch;
  FinanceData: any[];
  current: string;
  total: string;
}

const FinanceList: React.FC<FinanceProps> = (props) => {
  const {
    dispatch,
    FinanceData,
    current,
    total,
  } = props;
  const getFinance = (params: {}): void => {
    dispatch({
      type: 'FinanceControl/getFinance',
      payload: params,
    });
  };
  useEffect(() => {
    getFinance({page: current});
  }, [])
  const columns = [
    {
      title: '序号',
      dataIndex: 'storeId',
      align: 'center',
      editable: true,
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      align: 'center',
    },
    {
      title: '可用余额',
      dataIndex: 'balance',
      align: 'center',
    },
    {
      title: '认证状态',
      dataIndex: 'bind',
      align: 'center',
    },
    {
      title: '认证主体',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: () => (
        <Popconfirm title="确认删除吗?" onConfirm={() => console.log('delete')}>
          <Button type="default">删除</Button>
        </Popconfirm>
      )
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card>
        <Button type="primary" style={{ marginBottom: 16 }}>+ 新增</Button>
        <Table
          dataSource={FinanceData}
          columns={columns}
          size="middle"
          Pagination={Pagination}
        />
      </Card>
    </PageHeaderWrapper>
  )
}
export default connect(({ FinanceControl }: ConnectState) => ({
  FinanceData: FinanceControl.FinanceData,
  total: FinanceControl.total,
  current: FinanceControl.current,
}))(FinanceList);
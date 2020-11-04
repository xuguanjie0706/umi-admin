/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-10-11 16:54:23
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/Product/CardStatistics/index.js
 * @message:权益划转
 */
import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import CustomSearchContainer from '@/components/Custom/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/Custom/CustomSearchBtnContainer';
import { Button, Divider, message, Popconfirm } from 'antd';
import api from '@/api';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';
import moment from 'moment';
import CustomTabsTable from './TabsTable';


const fileName = 'ExchangeCard';

const Custom = (props) => {
  const { defaultSearchData, _id: memberId, isUser } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  /* 新增弹窗 */
  const handleEdit = async (item) => {
    // if (item._id) {
    //   const r = await api[fileName].getonebysimple({ _id: item._id });
    //   setDefaultData(r);
    // } else {
    console.log(item, modelChild);
    setDefaultData({ name: item._id });
    // }
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const handleDelete = async (item) => {
    try {
      const r = await api[fileName].statisticsUpdate(item);
      if (r) {
        tableChild && tableChild.initData();
        message.success('操作成功');
      }
    } catch (error) {

    }
  };

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {

  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
    // console.log(props);
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(
    () => (
      <></>
      // <Button style={{ marginBottom: 10, width: 100 }} type="primary" onClick={() => handleEdit({ _id: undefined })}>
      //   新增
      // </Button>
    ),
    [modelChild],
  );
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTabsTable, Search, CustomSearchBtnContainer(), addBtn),
    [addBtn],
  );
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '名称',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 100,
    },
    {
      title: '发卡数量',
      dataIndex: 'sumTotal',
      key: 'sumTotal',
      align: 'center',
      width: 100,
    },
    {
      title: '使用数量',
      dataIndex: 'useTotal',
      key: 'useTotal',
      align: 'center',
      width: 100,
    },
    {
      title: '未使用数量',
      key: 'unUseTotal',
      align: 'center',
      width: 100,
      render: text => text.sumTotal - text.useTotal
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      type: ['1'],
      render: (text) => <>{memberId === text._member && <>
        <Button type="link" onClick={() => handleEdit(text)}>
          编辑
        </Button>
        <Divider type="vertical" ></Divider>
        <Popconfirm
          title="确定要该操作吗？"
          onConfirm={() => handleDelete({
            name: text._id,
            newName: text._id,
            isLook: false
          })}>
          <Button type="link" >
            停用
          </Button>
        </Popconfirm>
      </>}
      </>,
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      type: ['0'],
      render: (text) => <>{memberId === text._member && <>
        <Button type="link" onClick={() => handleEdit(text)}>
          编辑
        </Button>
        <Divider type="vertical" ></Divider>
        <Popconfirm
          title="确定要该操作吗？"
          onConfirm={() => handleDelete({
            name: text._id,
            newName: text._id,
            isLook: true
          })}>
          <Button type="link" >
            启用
          </Button>
        </Popconfirm>
      </>}
      </>,
    },
  ];

  return (
    <>
      <SearchTable
        tabList={[
          { title: '常用卡', key: 1 },
          { title: '停用卡', key: 0 },
        ]}
        rowKey="_id"
        isUser={isUser}
        request={api[fileName].statistics}
        loading
        columns={columns}
        onTableRef={tableRef}
        isReset={false}
        defaultSearchData={defaultSearchData}
        tableChild={tableChild}
      />
      <ModalForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={modelRef}
        title={'编辑'}
        defaultData={defaultData}
        memberId={memberId}
        request={api[fileName].statisticsUpdate}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
    </>
  );
};

export default connect(({ user }) => ({
  _id: user._id,
  isUser: user.data.isUser
}))(Custom);

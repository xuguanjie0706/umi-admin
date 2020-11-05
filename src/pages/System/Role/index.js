/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-09-18 18:53:33
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/System/Role/index.js
 * @message:权益划转
 */
import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import CustomSearchContainer from '@/components/Custom/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/Custom/CustomSearchBtnContainer';
import { Button, Tag, Divider, message, Popconfirm } from 'antd';
import api from '@/api';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';
import md5 from 'md5';
const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan'];
const Custom = (props) => {
  const { pkgList, defaultSearchData } = props;

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
    console.log(item);
    setDefaultData(item);
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const handleDelete = async (item) => {
    try {
      const r = await api.Role.remove({ _id: item._id });
      if (r) {
        tableChild && tableChild.initData();
        message.success('删除成功');
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
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(
    () => (
      <Button style={{ marginBottom: 10, width: 100 }} type="primary" onClick={() => handleEdit({ _id: undefined })}>
        新增
      </Button>
    ),
    [modelChild],
  );
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn),
    [addBtn],
  );
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '角色内容',
      dataIndex: 'content',
      key: 'content',
      render: text => text.map((item, index) => <Tag color={colorList[(index % 8)]} key={item}>{item}</Tag>)
    },
    {
      title: '备注',
      ellipsis: true,
      dataIndex: 'remarks',
      key: 'remarks',
      width: 100
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text) => <>
        <Button type="link" onClick={() => handleEdit(text)}>
          编辑
      </Button>
        <Divider type="vertical" ></Divider>
        <Popconfirm
          title="确定要删除吗？"
          onConfirm={() => handleDelete(text)}>
          <Button type="link" >
            删除
            </Button>
        </Popconfirm>
      </>,
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="_id"
        request={api.Role.pagesimple}
        loading
        columns={columns}
        pkgList={pkgList}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
      <ModalForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        width={800}
        onRef={modelRef}
        title={!defaultData._id ? '新增' : '编辑'}
        defaultData={defaultData}
        request={api.Role.editoradd}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
    </>
  );
};

export default Custom;

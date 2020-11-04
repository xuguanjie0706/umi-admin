/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-09-25 16:58:59
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/SettingManage/ConfigView/index.js
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
import config from '@/utils/config';


const fileName = 'Config';

const Custom = (props) => {
  const { defaultSearchData } = props;

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
    if (item._id) {
      const r = await api[fileName].getonebysimple({ _id: item._id });
      setDefaultData(r);
    } else {
      setDefaultData(item);
    }
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const handleDelete = async (item) => {
    try {
      const r = await api[fileName].remove({ _id: item._id });
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
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100,
    },

    {
      title: '内容',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
    },

    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
    },
    {
      title: '新增时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
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
        request={api[fileName].pagesimple}
        loading
        columns={columns}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
      <ModalForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={modelRef}
        title={!defaultData._id ? '新增' : '编辑'}
        defaultData={defaultData}
        request={api[fileName].editoradd}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
    </>
  );
};

export default Custom;

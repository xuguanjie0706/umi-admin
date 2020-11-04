/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-10-12 17:36:27
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/System/Merchant/index.js
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
import UpForm from './UpForm';
import md5 from 'md5';
import { USER_STATUS_ENUM } from '@/utils/enum';
import moment from 'moment';
const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan'];

const Custom = (props) => {
  const { defaultSearchData = { isUser: 2 } } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [upChild, setUpChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };
  const upRef = (ref) => {
    setUpChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  /* 新增弹窗 */
  const handleEdit = async (item) => {
    if (item._id) {
      const r = await api.User.getonebysimple({ _id: item._id });
      setDefaultData(r);
    } else {
      setDefaultData(item);
    }
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const handleUp = async (item) => {
    // if (item._id) {
    //   const r = await api.User.getonebysimple({ _id: item._id });
    //   setDefaultData(r);
    // } else {

    // }
    setDefaultData(item);
    if (upChild) {
      upChild.handleShow();
    }
  };


  const handleDelete = async (item) => {
    try {
      const r = await api.User.remove({ _id: item._id });
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
      title: '账号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100,
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: 100,
    },
    {
      title: '角色名称',
      dataIndex: '_role',
      key: '_role',
      render: text => text.map((item, index) => <Tag color={colorList[(index % 8)]} key={item._id}>{item.name}</Tag>)
    },
    {
      title: '身份',
      dataIndex: 'isUser',
      key: 'isUser',
      render: text => USER_STATUS_ENUM[text]
    },
    {
      title: '会员',
      dataIndex: 'status',
      key: 'status',
      render: text => text ? '是' : '否'
    },
    {
      title: '过期时间',
      dataIndex: 'overtime',
      key: 'overtime',
      render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '添加时间',
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
        <Button type="link" onClick={() => handleUp(text)}>
          续期
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
        request={api.User.page}
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
        request={(values) => {
          const _data = { ...values, password: values.password && md5(values.password), status: true, overtime: moment().add(7, 'day').valueOf() };
          return api.User.editoradd(_data);
        }}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
      <UpForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={upRef}
        title={'设置过期时间'}
        defaultData={defaultData}
        request={api.User.renewMember}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
    </>
  );
};

export default Custom;

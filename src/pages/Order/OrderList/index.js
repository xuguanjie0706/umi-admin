/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2022-09-02 00:07:48
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/pages/Order/OrderList/index.js
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
import AddForm from './AddForm';
import moment from 'moment';
import config from '@/utils/config';
import { STATUS_ORDER_ENUM } from '@/utils/enum';


const fileName = 'Order';

const Custom = (props) => {
  const { defaultSearchData, _id: memberId, isUser } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [addChild, setAddChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值
  const [goodsList, setGoodsList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const addRef = (ref) => {
    setAddChild(ref);
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

  const handleAdd = async (item) => {
    setDefaultData({ _id: item._id });
    if (addChild) {
      addChild.handleShow();
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
    try {
      const r = await api.Goods.getsomebysimple();
      console.log(r);
      setGoodsList(r);
    } catch (error) {
      console.log(error);
    }
  };

  const initData = async () => {
    // const r = await api.User.getsomebysimple({
    //   isUser: 2
    // });
    // setMemberList(r);
  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
    // if (+isUser === 1) {
    //   initData();
    // }
    // console.log(props);
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
      title: '订单号',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 100
    },
    {
      title: '名称',
      key: 'name',
      align: 'center',
      width: 200,
      render: (text) => <span>{text._goods.name}</span>
    },
    {
      title: '描述',
      key: 'desc',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (text) => <span>{text._goods.desc}</span>
    },
    {
      title: '图片',
      key: 'img',
      align: 'center',
      width: 120,
      render: text => <img width="100" height="100" src={config.url + text._goods.img} alt="" />
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: (text) => <span>{STATUS_ORDER_ENUM[text]}</span>
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

        <Popconfirm
          title="确定要删除吗？"
          onConfirm={() => handleDelete(text)}>
          <Button type="link" >
            删除
          </Button>
        </Popconfirm>

      </>
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="_id"
        isUser={isUser}
        request={api[fileName].page}
        loading
        columns={columns}
        orderType={STATUS_ORDER_ENUM}
        goodsList={goodsList}
        onTableRef={tableRef}
        isReset={false}
        memberList={memberList}
        defaultSearchData={defaultSearchData}
      />
      <ModalForm
        goodsList={goodsList}
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={modelRef}
        title={!defaultData._id ? '新增' : '编辑'}
        defaultData={defaultData}
        memberId={memberId}
        request={api[fileName].add}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
      <AddForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={addRef}
        title={'添加数量'}
        defaultData={defaultData}
        memberId={memberId}
        request={api[fileName].addNum}
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

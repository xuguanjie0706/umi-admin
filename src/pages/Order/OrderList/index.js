/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-10-12 02:13:32
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/Order/OrderList/index.js
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
import SendForm from './Send';
import CustomTabsTable from './TabsTable';
import Btn from './Btn';
import moment from 'moment';


const fileName = 'ExchangeCard';
const AddressView = ({ mobile, people, mainArea, area }) => {
  return <span style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{`收货人:${people}\n电话:${mobile}\n地址:${area.join('')}${mainArea}`}</span>;
};

const Custom = (props) => {
  const { defaultSearchData, _id: memberId } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [sendChild, setSendChild] = useState(null); // 配送弹窗
  const [selectedKey, setSelectedKey] = useState([]); // 选择列表
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值
  const [type, setType] = useState('2');

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const sendRef = (ref) => {
    setSendChild(ref);
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

  const handleSend = async (item) => {
    setDefaultData(item);
    if (sendChild) {
      sendChild.handleShow();
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

  const rowSelection = type === '2' ? {
    selections: true,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys);
      setSelectedKey(selectedRowKeys);
      // setSelectedRowsData(selectedRows);
    },
    selectedRowKeys: selectedKey,
  } : null;

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
    CustomSearchContainer(CustomTabsTable, Search, Btn, addBtn),
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
      fixed: 'left'
    },
    {
      title: '卡号',
      dataIndex: 'card',
      key: 'card',
      align: 'center',
    },
    {
      title: '已兑换商品',
      dataIndex: '_usegoods',
      key: '_usegoods',
      align: 'center',
      render: text => text ? text.name : '-',

    },
    {
      title: '收货信息',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 100,
      render: text => text ? AddressView(text) : '-'
    },
    {
      title: '单号',
      dataIndex: 'sendInfo',
      key: 'sendInfo',
      align: 'center',
      type: ['4'],
      width: 100,
      render: text => text ? text.map(item => <div key={item.key}>{`${item.sendName}单号:${item.sendNumber},备注:${item.remarks || '-'}`}</div>) : '-'
    },
    {
      title: '兑换时间',
      dataIndex: 'exchangeTime',
      key: 'exchangeTime',
      align: 'center',
      render: text => text ? moment(text).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      type: ['3', '4'],
      render: (text) => <>
        {text.status !== '2' && <><Button type="link" onClick={() => handleSend(text)}>
          填单
        </Button></>
        }
        {/* <Divider type="vertical" ></Divider> */}
        {/* <Popconfirm
          title="确定要删除吗？"
          onConfirm={() => handleDelete(text)}>
          <Button type="link" >
            删除
        </Button>
        </Popconfirm> */}

      </>,
    },

  ];

  return (
    <>
      <SearchTable
        tabList={[
          { title: '全部', key: 0 },
          { title: '已兑换', key: 2 },
          { title: '待发货', key: 3 },
          { title: '已完成', key: 4 },
        ]}
        fileName={fileName}
        rowKey="_id"
        request={api[fileName].page}
        loading
        columns={columns}
        onTableRef={tableRef}
        isReset={false}
        defaultSearchData={defaultSearchData}
        tableChild={tableChild}
        rowSelection={rowSelection}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        type={type}
        setType={setType}
      />
      <SendForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={sendRef}
        title={'编辑'}
        width={800}
        defaultData={defaultData}
        request={api[fileName].editoradd}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      />
      {/* <ModalForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={modelRef}
        title={!defaultData._id ? '新增' : '编辑'}
        defaultData={defaultData}
        memberId={memberId}
        request={api[fileName].editoradd}
        callback={() => {
          tableChild && tableChild.initData();
        }}
      /> */}
    </>
  );
};

export default connect(({ user }) => ({
  _id: user._id
}))(Custom);

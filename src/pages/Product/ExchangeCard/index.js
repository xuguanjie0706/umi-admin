/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-10-12 18:52:25
 * @LastAuthor: xgj
 * @FilePath: /admin/src/pages/Product/ExchangeCard/index.js
 * @message:权益划转
 */
import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import CustomSearchContainer from '@/components/Custom/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/Custom/CustomSearchBtnContainer';
import { Button, Divider, message, Popconfirm, Tag } from 'antd';
import api from '@/api';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';
import SendForm from './Send';
import moment from 'moment';
import Btn from './Btn';
import ImportForm from './Import';
import config from '@/utils/config';
import { STATUS_USE_ENUM } from '@/utils/enum';
import CustomTabsTable from '../ExchangeCard/TabsTable';

const fileName = 'ExchangeCard';

const AddressView = ({ mobile, people, mainArea, area }) => {
  return <span style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>{`收货人:${people}\n电话:${mobile}\n地址:${area.join('')}${mainArea}`}</span>;
};

const Custom = (props) => {
  const { defaultSearchData, _id: memberId, isUser } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [sendChild, setSendChild] = useState(null); // 配送弹窗
  const [importChild, setImportChild] = useState(null); // 配送弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };
  const sendRef = (ref) => {
    setSendChild(ref);
  };
  const importRef = (ref) => {
    setImportChild(ref);
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
      r.time = moment(r.overtime);
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

  const handleImport = async (item) => {
    setDefaultData(item);
    if (importChild) {
      importChild.handleShow();
    }
  };

  const handleDelete = useCallback(async (item) => {
    try {
      // setDefaultData(item);
      const r = await api[fileName].remove({ _id: item._id });

      if (r) {
        tableChild && tableChild.initData();
        message.success('删除成功');
      }
    } catch (error) {
      console.log(error);
    }
  }, [tableChild]);

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
    // api[fileName].addSome({ count: 2 }).then(r => {
    //   console.log(r);
    // });
  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(
    () => (
      <>
        <Button style={{ marginBottom: 10, width: 100, marginRight: 10 }} type="primary" onClick={() => handleEdit({ _id: undefined })}>
          新增
      </Button>
        <Button style={{ marginBottom: 10, width: 100, marginRight: 10 }} type="dashed" onClick={() => handleImport({ _id: undefined })}>
          导入
        </Button>
      </>
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
      // width: 100,
      fixed: 'left'
    }, {
      title: '卡号',
      dataIndex: 'card',
      key: 'card',
      align: 'center',
      // width: 200,
      fixed: 'left'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      align: 'center',
      // width: 100,
    },
    // {
    //   title: '描述',
    //   dataIndex: 'value',
    //   key: 'value',
    //   align: 'center',
    //   width: 120,
    // },

    {
      title: '可兑换商品',
      dataIndex: '_goods',
      key: '_goods',
      align: 'center',
      // width: 120,
      render: text => text.map(item => <Tag key={item.name}>{item.name}</Tag>)
    },
    // {
    //   title: '已兑换商品',
    //   dataIndex: '_usegoods',
    //   key: '_usegoods',
    //   align: 'center',
    //   width: 120,
    //   render: text => text ? text.name : '-'
    // },
    // {
    //   title: '收货信息',
    //   dataIndex: 'address',
    //   key: 'address',
    //   align: 'center',
    //   width: 250,
    //   render: text => text ? AddressView(text) : '-'
    // },
    // {
    //   title: '单号',
    //   dataIndex: 'sendInfo',
    //   key: 'sendInfo',
    //   align: 'center',
    //   width: 250,
    //   render: text => text ? text.map(item => <div key={item.key}>{`${item.sendName}单号:${item.sendNumber},备注:${item.remarks}`}</div>) : '-'
    // },

    {
      title: '过期时间',
      dataIndex: 'overtime',
      key: 'overtime',
      align: 'center',
      // width: 120,
      render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '发卡时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      // width: 120,
      render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      fixed: 'right',
      // width: 80,
      render: text => STATUS_USE_ENUM[text]
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (text) => <>{memberId === text._member && <>
        {/* {text.status !== '1' && <><Button type="link" onClick={() => handleSend(text)}>
          填单
        </Button>
          <Divider type="vertical" ></Divider></>
        } */}
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
      </>}
      </>,
    },
  ];

  return (
    <>
      <SearchTable
        tabList={[
          { title: '全部', key: 0 },
          { title: '正常', key: 1 },
          { title: '已兑换', key: 2 },
          { title: '待发货', key: 3 },
          { title: '已完成', key: 4 },
        ]}
        isUser={isUser}
        // scroll={{ x: 'max-content' }}
        rowKey="_id"
        STATUS_USE_ENUM={STATUS_USE_ENUM}
        request={api[fileName].page}
        loading
        isReset={true}
        columns={columns}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
        tableChild={tableChild}
        showTotal={(total, range) => `总共${total}条`}
      />
      <ModalForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={modelRef}
        title={!defaultData._id ? '新增' : '编辑'}
        defaultData={defaultData}
        memberId={memberId}
        request={!defaultData._id ? api[fileName].addSome : api[fileName].editoradd}
        callback={() => {
          tableChild && tableChild.initData();
        }}
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
      <ImportForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        onRef={importRef}
        title={'导入'}
        // width={800}
        memberId={memberId}
        defaultData={defaultData}
        request={api[fileName].importData}
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

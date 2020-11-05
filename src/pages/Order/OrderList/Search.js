import React, { useEffect, useState } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';
import api from '@/api';
const arr = [{ key: true, value: '已支付' }, { key: false, value: '未支付' }];
const { Option } = Select;
const Search = (props) => {
  const { form, defaultSearchData } = props;
  const [memberList, setMemberList] = useState([]);


  const initLoad = async () => {
    const r = await api.User.getsomebysimple({
      isUser: 2
    });
    setMemberList(r);
  };
  useEffect(() => {
    initLoad();
  }, []);

  // form.setFieldsValue(defaultSearchData);
  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="card"
          label="卡号"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入卡号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="address.mobile"
          label="手机号"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="address.people"
          label="收件人"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入收件人" />
        </Form.Item>
      </Col>
      {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="_member"
          label="用户"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select allowClear placeholder="请选择">
            {memberList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Col> */}
      <Form.Item
        name="status"
        label="状态"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        hidden
        initialValue={'2'}
      >
        <Input />
      </Form.Item>
      {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="status"
          label="状态"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select allowClear placeholder="请选择">
            {arr.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)}
          </Select>
        </Form.Item>
      </Col> */}
    </Row >
  );
};

export default Search;

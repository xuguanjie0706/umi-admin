import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Select, DatePicker } from 'antd';
import api from '@/api';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;
const Search = (props) => {
  const { STATUS_USE_ENUM = [], form, defaultSearchData, isUser } = props;
  const statusUseEnum = Object.entries(STATUS_USE_ENUM);
  // form.setFieldsValue(defaultSearchData);

  const [memberList, setMemberList] = useState([]);

  const initLoad = async () => {

    const r = await api.User.getsomebysimple({
      isUser: 2
    });
    setMemberList(r);
  };
  useEffect(() => {
    if (+isUser === 1) {
      initLoad();
    }
  }, []);
  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="name"
          label="名称"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入名称" />
        </Form.Item>
      </Col>
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

      <Col xs={24} sm={12} md={8} lg={12} xl={12} xxl={6}>
        <Form.Item
          name="createdAt"
          label="发卡时间"
          labelCol={{ sm: { span: 8 }, md: { span: 8, }, lg: { span: 4, }, }}
          wrapperCol={{ sm: { span: 16 }, md: { span: 16, }, lg: { span: 20, }, }}
          getValueFromEvent={(values) => {
            // console.log(values);
            if (values) {
              return [moment(moment(values[0]).format('YYYY-MM-DD') + ' 00:00:00'), moment(moment(values[1]).format('YYYY-MM-DD') + ' 23:59:59')];
            }
            return values;
          }}
        >
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="status"
          label="状态"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select allowClear placeholder="请选择状态" >
            {statusUseEnum.map(item => <Option key={item[0]} value={item[0]}>{item[1]}</Option>)}
          </Select>
        </Form.Item>
      </Col> */}
      {
        +isUser === 1 && <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
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

        </Col>
      }
      <Form.Item
        name="status"
        hidden
      >
        <Input />
      </Form.Item>
    </Row >
  );
};

export default Search;

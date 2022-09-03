/*
 * @Author: xgj
 * @since: 2022-09-01 01:34:11
 * @lastTime: 2022-09-03 12:51:55
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/pages/Product/Metter/Search.js
 * @message: 
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';
import api from '@/api';

const { Option } = Select;
const Search = (props) => {
  const { isUser, form, defaultSearchData, memberList = [], goodsList = [] } = props;
  // const [memberList, setMemberList] = useState([]);

  // const initLoad = async () => {
  //   const r = await api.User.getsomebysimple({
  //     isUser: 2
  //   });
  //   setMemberList(r);
  // };
  // useEffect(() => {
  //   if (+isUser === 1) {
  //     initLoad();
  //   }
  // }, []);
  // form.setFieldsValue(defaultSearchData);

  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="_goods"
          label="名称"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select showSearch filterOption={(input, option) =>
            option.children
              .toLowerCase()
              .includes(input.toLowerCase())
          } allowClear placeholder="请选择名称" >
            {
              goodsList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>
      </Col>
      {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="_type"
          label="分类"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select allowClear placeholder="请选择分类">
            {typeList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Col>
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
      } */}

    </Row >
  );
};

export default Search;

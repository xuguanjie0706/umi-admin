import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, DatePicker } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import api from '@/api';
import { phoneValidator } from '@/utils/validator';
import moment from 'moment';


const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, form } = props;

  const [roleList, setRoleList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const initLoad = async () => {
    try {
      const r = await api.Role.getsomebysimple();
      setRoleList(r);
    } catch (error) { }
  };


  useEffect(() => {
    initLoad();
    setIsShow(defaultData._id);
  }, []);

  useEffect(() => {
    if (defaultData._id) {
      setFieldsValue(defaultData);
    }
  }, [defaultData._id]);

  return (
    <>
      <Form.Item name="_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="isUser" hidden initialValue="2">
        <Input />
      </Form.Item>
      <Form.Item
        label="账号"
        name="name"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input readOnly={defaultData._id} allowClear placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号' }, {
          validator: phoneValidator
        }]}
      >
        <Input maxLength={11} allowClear placeholder="请输入手机号" />
      </Form.Item>
      {
        !isShow && <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请选择密码' }]}
        >
          <Input.Password autocomplete="new-password" allowClear placeholder="请输入密码" />
        </Form.Item>
      }
      <Form.Item
        label="角色"
        name="_role"
        rules={[{ required: true, message: '请选择账号' }]}
      >
        <Select mode="multiple">
          {roleList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      {/* <Form.Item name="overtime" hidden >
        <Input />
      </Form.Item>
      <Form.Item name="time" label="过期时间"
        // rules={[{ required: true, message: '请选择过期时间' }]}
        getValueFromEvent={(value) => {
          const _data = { overtime: moment(moment(value).format('YYYY-MM-DD') + ' 00:00:00').valueOf() };
          form().setFieldsValue(_data);
          // console.log(_data);
          return value;
        }}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item> */}
    </>
  );
};

export default CustomModalContainer(CustomForm);

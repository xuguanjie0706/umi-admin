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
      <Form.Item name="overtime" hidden >
        <Input />
      </Form.Item>
      <Form.Item name="time" label="过期时间"
        rules={[{ required: true, message: '请选择过期时间' }]}
        getValueFromEvent={(value) => {
          const _data = { overtime: moment(moment(value).format('YYYY-MM-DD') + ' 00:00:00').valueOf() };
          form().setFieldsValue(_data);
          // console.log(_data);
          return value;
        }}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);

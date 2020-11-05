import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import CutsomTreeTransfer from './components/CustomTreeTransfer';
import api from '@/api';

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, getFieldsValue, setFieldsValue } = props;
  const [systemMenu, setSystemMenu] = useState([]);
  const initLoad = async () => {
    try {
      const r = await api.Menu.getonebysimple();
      if (r) {
        setSystemMenu(r.content[0].children);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    initLoad();
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
      <Form.Item
        label="角色名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input allowClear placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        label="角色内容"
        name="content"
        rules={[{ required: true, message: '请选择内容' }]}
      >
        <CutsomTreeTransfer treeData={systemMenu} />
      </Form.Item>

      <Form.Item label="备注" name="remarks">
        <Input.TextArea maxLength={20} autoSize={{ minRows: 3, maxRows: 5 }} type="textarea" allowClear />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);

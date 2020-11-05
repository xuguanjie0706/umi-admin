
import React, { useState, useEffect } from 'react';
import {
  Tree,
  Button,
  Tag,
  Modal,
  Input,
  Card,
  Form,
  Select,
  Row,
  Col,
  message,
} from 'antd';
import CustomTree from './components/CustomTree';
import './index.less';
import api from '@/api';

const { Option } = Select;


const Menu = (props) => {
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;

  const initData = async () => {
    const r = await api.Menu.getonebysimple();
    if (r === true) {
      setFieldsValue({
        content: [{
          name: '系统菜单',
          code: 'system'
        }]
      });
    } else {
      setFieldsValue(r);
    }

  };
  useEffect(() => {
    initData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();
    const r = api.Menu.editoradd(values);
    message.success('提交成功');
    setFieldsValue({
      _id: r._id
    });
  };

  return (
    <>
      <Card title="菜单配置">
        <Form form={form}>
          {/* <Form.Item></Form.Item> */}
          <Form.Item label="菜单内容" name="content">
            <CustomTree />
          </Form.Item>

          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" onClick={handleClick}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default Menu;

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Row, Col, Radio } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import { TIME_NUMBER_LIST, COME_INTO_FORCE_LIST, ONLINE_LIST } from '@/utils/enum';


const { Option } = Select;
const CustomForm = (props) => {
  const {
    defaultData = {},
    form: FormRef,
    setFieldsValue
  } = props;


  // const { getFieldValue, setFieldsValue } = form;
  const [form, setForm] = useState({ getFieldValue: () => { } });
  useEffect(() => {
    if (defaultData.id) {
      // setFieldsValue(defaultData);
    } else {
      // resetFields();
    }
  }, [defaultData.id]);

  useEffect(() => {
    setForm(FormRef());
  }, []);


  return (
    <>
      {/* {console.log(form().getFieldsValue(), 12313)} */}
      <Form.Item hidden name="type" initialValue={defaultData.type}>
        <Input />
      </Form.Item>

      {
        form.getFieldValue('type') !== 1 && <Form.Item
          name="oldName" label="上级菜单"
          initialValue={defaultData.oldName}
        >
          <Input readOnly placeholder="请输入名称" />
        </Form.Item>
      }
      <Form.Item hidden name="oldCode" initialValue={defaultData.oldCode}>
        <Input />
      </Form.Item>
      <Form.Item
        label="菜单编码"
        name="code"
        rules={[
          {
            required: true,
            message: '请输入菜单编码!',
          },
        ]}
        initialValue={defaultData.code}>
        <Input readOnly={form.getFieldValue('type') === 1} placeholder="请输入菜单编码" />
      </Form.Item>
      <Form.Item
        label="菜单名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入菜单名称!',
          },
        ]}
        initialValue={defaultData.name}>
        <Input placeholder="请输入菜单名称" />
      </Form.Item>
    </>
  );
};


export default CustomModalContainer(CustomForm);

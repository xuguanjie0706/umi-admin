/*
 * @Author: xgj
 * @since: 2022-08-30 20:25:00
 * @lastTime: 2022-09-03 12:50:16
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/pages/SettingManage/SettingView/Form.js
 * @message: 
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber, Upload, message } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
// import { UNIT_ENUM } from '@/utils/enum';


const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue } = props;

  // const unitEnum = Object.entries(UNIT_ENUM);
  // const [isShow, setIsShow] = useState(false);
  const initLoad = async () => {
    // try {
    //   const r = await api.Role.getsomebysimple();
    //   setRoleList(r);
    // } catch (error) { }
  };


  useEffect(() => {
    initLoad();
    // setIsShow(defaultData._id);
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
        label="名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input allowClear placeholder="请输入名称" />
      </Form.Item>


      <Form.Item
        label="内容"
        name="value"
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <Input allowClear placeholder="请输入内容" />
      </Form.Item>
      {/* <Form.Item
        label="单位"
        name="unit"
        rules={[{ required: true, message: '请选择单位' }]}
      >
        <Select placeholder="请选择单位">
          {unitEnum.map(item => <Option key={item[1]} value={item[1]}>{item[1]}</Option>)}
        </Select>
      </Form.Item> */}
    </>
  );
};
export default CustomModalContainer(CustomForm);

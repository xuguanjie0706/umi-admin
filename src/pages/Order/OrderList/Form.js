/*
 * @Author: xgj
 * @since: 2022-09-01 00:51:22
 * @lastTime: 2022-09-01 23:20:04
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/pages/Order/OrderList/Form.js
 * @message: 
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber, Upload, message } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import CustomUpload from '@/components/Custom/CustomApiFormItem/PeopleCardUpload';
import UploadPic from '@/components/Custom/CustomApiFormItem/UploadPic';
import api from "@/api"

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, memberId, goodsList = [] } = props;
  const chennelList = ["天猫", "京东", "淘宝"]
  const [isReady, setIsReady] = useState(false);
  const initLoad = async () => {
    try {
      // const r = await api.Type.getsomebysimple();
      // console.log(r);
      // setTypeList(r);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (defaultData._id) {
      setFieldsValue(defaultData);
    }
    setIsReady(true);
  }, [defaultData._id]);

  return (
    <>{
      isReady && <><Form.Item name="_id" hidden>
        <Input />
      </Form.Item>
        <Form.Item name="type" hidden initialValue={1}>
          <Input />
        </Form.Item>
        <Form.Item
          label="名称"
          name="_goods"
          rules={[{ required: true, message: '请选择名称' }]}
        >
          <Select allowClear>
            {
              goodsList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="个数"
          name="num"
          rules={[{ required: true, message: '请输入数量' }]}
        >
          <InputNumber min={0} style={{ width: 200 }} allowClear placeholder="请输入数量" />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[{ required: true, message: '请输入价格' }]}
        >
          <InputNumber style={{ width: 200 }} allowClear placeholder="请输入价格" />
        </Form.Item>
        <Form.Item
          label="渠道"
          name="channel"
          initialValue="天猫"
          rules={[{ required: true, message: '请选择名称' }]}
        >
          <Select allowClear>
            {
              chennelList.map(item => <Option value={item} key={item}>{item}</Option>)
            }
          </Select>
        </Form.Item>
      </>
    }
    </>
  );
};
export default CustomModalContainer(CustomForm);

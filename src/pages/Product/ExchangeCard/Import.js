import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Upload, message } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import api from '@/api';
import moment from 'moment';
import UploadPic from '@/components/Custom/CustomApiFormItem/UploadPic';

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, memberId } = props;
  const [isFinish, setIsFinish] = useState(false);
  const [goodsList, setGoodsList] = useState([]);
  const initLoad = async () => {

    try {
      const r = await api.Goods.getsomebysimple({
        _member: memberId
      });
      setGoodsList(r);
    } catch (error) { }
  };


  useEffect(() => {
    initLoad();
    defaultData.status = 3;
    if (defaultData._id) {
      setFieldsValue(defaultData);
    }
    setIsFinish(true);
  }, []);


  return (
    <>{isFinish && <>
      <Form.Item name="_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="_member" hidden initialValue={memberId}>
        <Input />
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input allowClear placeholder="请输入名称" />
      </Form.Item>
      {/* <Form.Item
        label="描述"
        name="value"
      // rules={[{ required: true, message: '请输入描述' }]}
      >
        <Input allowClear placeholder="请输入描述" />
      </Form.Item> */}
      <Form.Item
        label="商品"
        name="_goods"
        rules={[{ required: true, message: '请选择商品' }]}
      >
        <Select placeholder="请选择商品" mode="multiple">
          {goodsList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="过期时间"
        name="overtime"
        initialValue={moment(moment().add(1, 'year').format('YYYY-MM-DD') + ' 00:00:00')}
        rules={[{ required: true, message: '请选择过期时间' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="卡号信息"
        name="cardfile"
        rules={[{ required: true, message: '请上传卡号' }]}
      >
        <UploadPic
          request={api.File.uploadExcel}
          maxLength={1}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          title="文件上传" />
      </Form.Item>
    </>}
    </>
  );
};
export default CustomModalContainer(CustomForm);

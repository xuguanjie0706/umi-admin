import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import api from '@/api';
import moment from 'moment';


const { Option } = Select;

const CustomForm = (props) => {
  console.log(props);
  const { defaultData, setFieldsValue, memberId, form } = props;
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
      {!!defaultData._id &&
        <><Form.Item
          label="卡号"
          name="card"
          rules={[{ required: true, message: '请输入卡号' }]}
        >
          <Input readOnly placeholder="请输入卡号" />
        </Form.Item><Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
            <Input readOnly placeholder="请输入密码" />
          </Form.Item>
        </>
      }
      {/* <Form.Item
        label="描述"
        name="value"
      // rules={[{ required: true, message: '请输入描述' }]}
      >
        <Input allowClear placeholder="请输入描述" />
      </Form.Item> */}
      {!defaultData._id && <Form.Item
        label="编号"
        name="code"
      >
        <Input allowClear placeholder="请输入编号" maxLength={4} />
      </Form.Item>}

      <Form.Item
        label="商品"
        name="_goods"
        rules={[{ required: true, message: '请选择商品' }]}
      >
        <Select placeholder="请选择商品" mode="multiple">
          {goodsList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item name="overtime" hidden initialValue={moment(moment().add(1, 'year').format('YYYY-MM-DD') + ' 00:00:00').valueOf()}>
        <Input />
      </Form.Item>
      <Form.Item name="time" label="过期时间"
        initialValue={moment().add(1, 'year')}
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

      {!defaultData._id && <Form.Item
        label="张数"
        name="count"
        rules={[{ required: true, message: '请输入一次性生成的张数' }]}
        initialValue={1}
      >
        <InputNumber allowClear placeholder="请输入一次性生成的张数" />
      </Form.Item>}
    </>}
    </>
  );
};
export default CustomModalContainer(CustomForm);

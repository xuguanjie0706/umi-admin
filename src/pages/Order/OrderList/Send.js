import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber, Upload, message } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import api from '@/api';
import SendInfoForm from './components/sendInfoForm';


const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, } = props;
  const [isFinish, setIsFinish] = useState(false);
  const initLoad = async () => {

  };


  useEffect(() => {
    initLoad();
    defaultData.status = 4;
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
      <Form.Item name="status" hidden >
        <Input />
      </Form.Item>
      <Form.Item
        label="快递信息"
        name="sendInfo"
        rules={[{ required: true, message: '请输入单号' }]}
      >
        <SendInfoForm />
      </Form.Item>
    </>}
    </>
  );
};
export default CustomModalContainer(CustomForm);

import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber, Upload, message } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import CustomUpload from '@/components/Custom/CustomApiFormItem/PeopleCardUpload';
import UploadPic from '@/components/Custom/CustomApiFormItem/UploadPic';
import api from "@/api"

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, memberId, typeList = [] } = props;

  const [isReady, setIsReady] = useState(false);
  const initLoad = async () => {
    // console.log(123);
    // try {
    //   const r = await api.Type.getsomebysimple();
    //   console.log(r);
    //   setTypeList(r);
    // } catch (error) {
    //   console.log(error);
    // }
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

        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input allowClear placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          label="描述"
          name="desc"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input.TextArea allowClear placeholder="请输入描述" />
        </Form.Item>
        <Form.Item
          extra="推荐尺寸为160*160"
          label="首图"
          name="img"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <CustomUpload styles={{ width: 160, height: 160 }} desc="图片上传" />
        </Form.Item>
        <Form.Item
          label="单品个数"
          name="specs"
          rules={[{ required: true, message: '请输入数量' }]}
        >
          <InputNumber min={0} style={{ width: 200 }} allowClear placeholder="请输入数量" />
        </Form.Item>
        <Form.Item
          label="价格"
          name="mailPrice"
          rules={[{ required: true, message: '请输入价格' }]}
        >
          <InputNumber style={{ width: 200 }} allowClear placeholder="请输入价格" />
        </Form.Item></>
    }
    </>
  );
};
export default CustomModalContainer(CustomForm);

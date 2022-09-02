import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import CustomModalContainer from '@/components/Custom/CustomModalContainer';


const CustomForm = (props) => {
  const { defaultData, setFieldsValue, memberId } = props;

  const [isReady, setIsReady] = useState(false);
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
    setIsReady(true);
  }, [defaultData._id]);

  return (
    <>{
      isReady && <><Form.Item name="_id" hidden>
        <Input />
      </Form.Item>
        <Form.Item
          label="补充数量"
          name="num"
          rules={[{ required: true, message: '请输入数量' }]}
        >
          <InputNumber min={1} style={{ width: 200 }} allowClear placeholder="请输入数量" />
        </Form.Item></>
    }
    </>
  );
};
export default CustomModalContainer(CustomForm);

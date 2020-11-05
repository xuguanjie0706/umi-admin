import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Select } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { SEND_NAME_ENUM } from '@/utils/enum';

const sendNameList = Object.entries(SEND_NAME_ENUM);
const { Option } = Select;
const SendInfoForm = (props) => {
  const { value, onChange } = props;
  const [list, setList] = useState([{ key: 1 }]);

  // useEffect(() => {
  //   // onChange(list);
  //   console.log(list);
  // }, [list]);

  useEffect(() => {
    if (value) {
      setList(value);
    }
  }, []);

  const handleClick = () => {
    const _data = [...list, { key: list.length + 1 }];
    setList(_data);
  };

  return <div>
    {list.map((item, index) => <SendInfoFormItem onChange={onChange} item={item} setList={setList} list={list} index={index} key={item.key} />)}
    <Button style={{ width: 200 }} type="dashed" onClick={handleClick}><PlusOutlined />添加</Button>
  </div>;
};


const SendInfoFormItem = (props) => {
  const { onChange, index, list, setList, item } = props;
  const [sendName, setSendName] = useState(undefined);
  const [sendNumber, setSendNumber] = useState(null);
  const [remarks, setRemarks] = useState(null);

  // console.log(item, sendName, sendNumber, remarks);
  const hangleClick = () => {
    const _list = [...list];
    _list.splice(index, 1);
    onChange(_list);
  };

  useEffect(() => {
    try {
      const { sendName, sendNumber, remarks } = item;
      setSendName(sendName);
      setSendNumber(sendNumber);
      setRemarks(remarks);
    } catch (error) {

    }
  }, [item]);

  useEffect(() => {
    const _list = [...list];
    _list[index].sendName = sendName;
    onChange(_list);
  }, [sendName]);

  useEffect(() => {
    const _list = [...list];
    _list[index].sendNumber = sendNumber;
    onChange(_list);
  }, [sendNumber]);

  useEffect(() => {
    const _list = [...list];
    _list[index].remarks = remarks;
    onChange(_list);
  }, [remarks]);


  return (<span style={{ display: 'flex', }}>
    <Form.Item >
      <Select value={sendName} onChange={(e) => setSendName(e)} style={{ width: 150 }} placeholder="请选择快递公司">
        {sendNameList.map(item => <Option key={item[1]} value={item[1]}>{item[1]}</Option>)}
      </Select>
    </Form.Item>
    <Form.Item >
      <Input value={sendNumber} onChange={(e) => setSendNumber(e.target.value)} placeholder="请输入单号" />
    </Form.Item>
    <Form.Item style={{ width: 120 }}>
      <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="请输入备注" />
    </Form.Item>
    <Button onClick={hangleClick}><CloseOutlined /></Button>
  </span>);
};


export default SendInfoForm;

import React from 'react';
import { Button } from 'antd';
import CustomSearchBtnContainer from '@/components/Custom/CustomSearchBtnContainer';
import api from '@/api';
import config from '@/utils/config';

const Btn = props => {
  // console.log(props);
  const { form } = props;
  const handleClick = () => {
    // console.log(form.getFieldsValue());
    const data = form.getFieldsValue();
    api.ExchangeCard.deriveData(data).then(r => {
      location.href = config.url + r;
      // window.open(r)
      // console.log(r);
    });
  };
  return (
    <>
      <Button style={{ width: 80 }} onClick={handleClick}>
        导出
      </Button>
    </>
  );
};

export default CustomSearchBtnContainer(Btn);

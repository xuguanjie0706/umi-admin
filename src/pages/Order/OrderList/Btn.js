import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import CustomSearchBtnContainer from '@/components/Custom/CustomSearchBtnContainer';
import api from '@/api';
import config from '@/utils/config';

const fileName = 'ExchangeCard';
const Btn = props => {
  // console.log(props);

  const { form, selectedKey = [], tableChild, type } = props;
  const handleClick = () => {

    const data = form.getFieldsValue();
    if (data.status !== '3') {
      message.error('只有已发货栏才能导出');
      return;
    }
    api.ExchangeCard.deriveAddressData(data).then(r => {
      location.href = config.url + r;
      // window.open(r)
      // console.log(r);
    });
  };

  const handleSendClick = () => {
    const data = form.getFieldsValue();
    if (data.status !== '2') {
      message.error('只有已兑换栏才能进行发货');
      return;
    }
    if (selectedKey.length) {
      api[fileName].orderSend({ ids: selectedKey }).then(r => {
        if (tableChild) {
          tableChild.initData();
        }
      });
    } else {
      message.error('请勾选已兑换需发货的订单');
    }
  };
  useEffect(() => {
    console.log(form.getFieldValue('status'));
  }, [form.getFieldValue('status')]);

  return (
    <>
      {type === '2' &&
        <Button type="dashed" style={{ width: 100 }} onClick={handleSendClick}>
          批量发货
       </Button>
      }
      {type === '3' &&
        <Button style={{ width: 80, marginRight: 10 }} onClick={handleClick}>
          导出
      </Button>
      }


    </>
  );
};

export default CustomSearchBtnContainer(Btn);

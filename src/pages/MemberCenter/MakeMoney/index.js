import React, { useState, useEffect } from 'react';
import { Card, Result, Button, Form, Modal } from 'antd';
import api from '@/api';
import { connect } from 'umi';
import QRCode from 'qrcode.react';
import pic from './assets/pic.jpg';
import moment from 'moment';

const MakeMoney = (props) => {
  const { user: { _id: _member, overtime } } = props;
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [money, setMoney] = useState('');


  const initLoad = async () => {
    const r = await api.Config.getonebysimple({
      name: '年费'
    });
    if (r && r !== true) {
      setMoney(r.value);
    }

  };
  useEffect(() => {
    initLoad();
  }, []);
  const handleClick = async () => {
    setLoading(true);
    try {
      const r = await api.Weixin.getPayWeb({ _member });
      if (r) {
        setVisible(true);
        setCode(r);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }


  };
  return (
    <Card title="充值">
      <Result
        icon=""
        // status="success"
        title={`会员有效期至${moment(overtime).format('YYYY-MM-DD')}`}
        subTitle={`按年计算，一年${(money / 100).toFixed(2)}元`}
        extra={[
          <Button loading={loading} onClick={handleClick} type="primary" key="buy">去充值</Button>,
        ]}
      />
      <Modal
        style={{ top: 20 }}
        // width={300}
        footer={null}
        title="请微信扫码续费,付款成功请手动刷新界面" visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
        <div style={{ backgroundImage: `url(${pic})`, position: '0 0', backgroundSize: '100% 100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600 }}>
          <QRCode
            style={{ marginTop: -35 }}
            id='qrid2'
            value={code} // value参数为生成二维码的链接
            size={200} // 二维码的宽高尺寸
            fgColor="#000000" // 二维码的颜色
          ></QRCode>
        </div>
      </Modal>
    </Card>
  );
};

export default connect(({ user }) => ({ user: user.data }))(MakeMoney);

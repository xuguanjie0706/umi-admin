/*
 * @Author: xgj
 * @since: 2022-08-30 20:25:00
 * @lastTime: 2022-09-03 15:39:26
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/pages/Home/index.js
 * @message: 
 */
import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Statistic, Row, Col } from 'antd';
import api from '@/api';
import './index.less';
// import { getArray } from '@/utils/index';
import moment from 'moment';
import { connect } from 'umi';

const Home = (props) => {
  console.log(props);
  const { user: { overtime, phone, status, isUser } } = props;
  const [data, setData] = useState([[]]);
  // const [url, setUrl] = useState('');
  useEffect(() => {
    initData()
    // if (isUser === '1') {
    //   api.ExchangeCard.homeStatisticsAdmin().then(r => {
    //     setData(r);
    //   });
    // } else {
    //   api.ExchangeCard.homeStatistics().then(r => {
    //     setData(r);
    //   });
    // }


  }, []);
  const initData = async () => {
    const r = await api.Matter.allPrice()
    setData(r)
  }
  return (
    <>
      <Card title="欢迎您使用小卖部系统">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="库存数量" value={data.allnum} />
          </Col>
          <Col span={6}>
            <Statistic title="库存总价" value={data.allprice} />
          </Col>
          <Col span={6}>
            <Statistic title="买入总价" value={data.allbuyprice} />
          </Col>
          <Col span={6}>
            <Statistic title="历史卖出总价" value={data.allbuyprice - data.allprice} />
          </Col>
          <Col span={6}>
            <Statistic title="总买入数量" value={data.allbuynum} />
          </Col>
          <Col span={6}>
            <Statistic title="总卖出数量" value={data.allbuynum - data.allnum} />
          </Col>
          <Col span={6}>
            <Statistic title="库存卖出总价格" value={data.allmailpirce} />
          </Col>
          <Col span={6}>
            <Statistic title="库存卖出总利润" value={data.allmailpirce - data.allprice} />
          </Col>
        </Row>
      </Card>

    </>

  );
};


export default connect(({ user }) => ({ user: user.data }))(Home);

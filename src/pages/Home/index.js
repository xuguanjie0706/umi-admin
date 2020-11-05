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
  return (
    <>
      {isUser === '1' ? <Card title="欢迎您使用乐隐微信自助提货系统">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="今日新增商户" value={data[4]} />
          </Col>
          <Col span={6}>
            <Statistic title="商户总数" value={data[1]} />
          </Col>
          <Col span={6}>
            <Statistic precision={2} title="会员续费总额(元)" value={data[0][0] && (data[0][0].price / 100)} />
          </Col>
          <Col span={6}>
            <Statistic title="已兑换数/卡片总数" value={data[3]} suffix={`/ ${data[2]}`} />
          </Col>
        </Row>
      </Card> : <><Card title="欢迎您使用乐隐微信自助提货系统">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="今日兑换" value={data[3]} />
          </Col>
          <Col span={6}>
            <Statistic title="最近一个月兑换" value={data[4]} />
          </Col>
          <Col span={6}>
            <Statistic title="套餐总数" value={data[0].length} />
          </Col>
          <Col span={6}>
            <Statistic title="已兑换数/卡片总数" value={data[2]} suffix={`/ ${data[1]}`} />
          </Col>
        </Row>
        {/* <img src={url} alt="" /> */}
      </Card>
          <Card title="会员信息" style={{ marginTop: 10 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic groupSeparator="" title="会员手机号" value={phone} />
              </Col>
              <Col span={6}>
                <Statistic title="身份" value={status ? '会员' : '非会员'} />
              </Col>
              <Col span={6}>
                <Statistic title="会员截止日期" value={moment(overtime).format('YYYY-MM-DD')} />
              </Col>
              {/* <Col span={6}>
            <Button style={{ marginTop: 16 }} type="primary">
              立即充值
            </Button>
          </Col> */}
            </Row>
          </Card></>}

    </>

  );
};


export default connect(({ user }) => ({ user: user.data }))(Home);

import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Form, Input, Button, message } from 'antd';
import QRCode from 'qrcode.react';
import { connect } from 'umi';
import api from '@/api';
import moment from 'moment';
import pic from './assets/pic.jpg';
import CustomUpload from '@/components/Custom/CustomApiFormItem/PeopleCardUpload';
import config from '@/utils/config';

const MakeMoney = (props) => {
  // console.log(props);

  const { user: { _id, phone, overtime } } = props;
  // const [data, setData] = useState({});

  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const initData = async () => {
    const r = await api.MemberSetting.getonebysimple({ _member: _id });
    if (r && r !== true) {
      // setData(r);
      // console.log(r);
      setFieldsValue(r);
    }
  };
  useEffect(() => {
    initData();
  }, []);

  const onFinish = async (values) => {
    // console.log(values);
    const r = await api.MemberSetting.editoradd(values);
    if (r) {
      setFieldsValue(r);
      message.success('更新成功！');
    }
  };

  return (
    <Card title="个性化配置">
      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item name="_id" hidden >
          <Input />
        </Form.Item>
        <Form.Item name="_member" hidden initialValue={_id} >
          <Input />
        </Form.Item>
        <Descriptions bordered column={2} style={{ width: '100%' }}>
          <Descriptions.Item label="软件标题" >
            <Form.Item name="name" >
              <Input placeholder="请输入软件标题" />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="客服联系方式" >
            <Form.Item name="phone" >
              <Input placeholder="请输入客服联系方式" />
            </Form.Item>
          </Descriptions.Item>
          {/* <Descriptions.Item label="会员联系方式" >
            {phone}
          </Descriptions.Item>
          <Descriptions.Item label="会员到期时间" >
            {moment(overtime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item> */}
          <Descriptions.Item label="微信端地址" span={4} >
            {config.webUrl + _id}
          </Descriptions.Item>

          {/* <Descriptions.Item label="提示信息" >
            <Form.Item>
              <Input.TextArea placeholder="请输入提示信息" />
            </Form.Item>
          </Descriptions.Item> */}
          <Descriptions.Item label="软件背景图" span={2}>
            <Form.Item name="img" extra="推荐尺寸375*812">
              <CustomUpload styles={{ width: 160, height: 160 }} desc="图片上传" />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={<span style={{ whiteSpace: 'pre-wrap' }}>{'请商户首先关注本服务号,\n二维码获取订单通知功能'} </span>} span={2}>
            <img src={pic} alt="" width={125} />
          </Descriptions.Item>
          <Descriptions.Item label="请商户扫码完成个人微信通知绑定功能" span={2}>
            <div style={{ padding: 8 }}>
              <QRCode
                id='qrid'
                value={`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45d398e7c87a97f6&redirect_uri=http%3A%2F%2Fpick.yystart.com%2Fmobile%2F%23%2Fhome&response_type=code&scope=snsapi_base&state=${_id}#wechat_redirect`} // value参数为生成二维码的链接
                size={110} // 二维码的宽高尺寸
                fgColor="#000000" // 二维码的颜色
              />
            </div>
          </Descriptions.Item>
        </Descriptions>
        <div>
          <Button htmlType="submit" style={{ marginTop: 10 }} type="primary">保存配置</Button>
        </div>
      </Form>


    </Card >
  );
};

export default connect(({ user }) => ({ user: user.data }))(MakeMoney);

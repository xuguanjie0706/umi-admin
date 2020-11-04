import React, { useState } from 'react';
import { Form, message, Input, Button } from 'antd';
// import getData from '../../utils/api';
import { connect } from 'umi';
import '../index.less';
import { UserOutlined, LockOutlined, SafetyOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '@/api';
import md5 from 'md5';

const { Search } = Input;

const ForgetView = ({ history, user, dispatch }) => {
  // console.log(props);
  let timer = null;
  let sum = 60;
  const [form] = Form.useForm();

  const [buttonTitle, setbuttonTitle] = useState('获取验证码');
  const [buttonDisable, setbuttonDisable] = useState(false);

  const handleSubmit = async (values) => {
    const _data = { ...values, password: md5(values.password) };
    const r = await api.User.forget(_data);
    if (r) {
      message.success('修改成功');
      history.push('/login');
    }
  };

  const handleVerification = async () => {
    try {
      const { validateFields } = form;
      setbuttonDisable(true);
      const a = await validateFields(['phone']);
      const r = await api.User.getVerfication(a);
      if (r) {
        message.success('验证码发送成功');
        timer = setInterval(() => {
          sum--;
          setbuttonTitle(`${sum}s`);
          if (sum === 0) {
            sum = 60;
            setbuttonDisable(false);
            setbuttonTitle('获取验证码');
            clearInterval(timer);
          }
        }, 1000, true);
      }
    } catch (error) {
      setbuttonDisable(false);
    }

  };
  return (
    <div className="login-room">
      <Form form={form} onFinish={handleSubmit} className="login-form">
        <h2>修改密码</h2>
        <Form.Item name="name" rules={[{ required: true, message: '请输入账号' }]}>
          <Input
            prefix={<UserOutlined style={{ color: '#ccc' }} />}
            placeholder="请输入账号"
          />
        </Form.Item>
        <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号码' }]} >
          <Input
            prefix={<PhoneOutlined style={{ color: '#ccc' }} />}
            placeholder="请输入手机号码"
          />
        </Form.Item>
        <Form.Item name="verification" rules={[{ required: true, message: '请输入验证码' }]}>
          <Search
            allowClear
            prefix={<SafetyOutlined style={{ color: '#ccc' }} />}
            placeholder="输入验证码" onSearch={() => handleVerification()} enterButton={<Button style={{ width: 102 }} disabled={buttonDisable} type="primary">{buttonTitle}</Button>}
          />
        </Form.Item>
        <Form.Item name="password" rule={[{ required: true, message: '请输入新的密码!' }]}>
          <Input
            autocomplete="new-password"
            prefix={<LockOutlined style={{ color: '#ccc' }} />}
            type="password"
            placeholder="请输入新的密码"
          />
        </Form.Item>


        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => history.push('/login')} type="primary" className="login-form-button">
            返回登陆
            </Button>
          <Button type="danger" htmlType="submit" className="login-form-button">
            修改
            </Button>
        </div>
      </Form>
    </div>
  );
};

export default connect((user) => ({
  user
}))(ForgetView);

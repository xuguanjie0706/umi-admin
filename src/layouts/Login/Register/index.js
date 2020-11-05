import { Form, Icon, Input, Button, Checkbox, Col, Row, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../index.less';
// import getData from '../../utils/api';
import { connect, Link } from 'umi';
import { phoneValidator } from '@/utils/validator';
import md5 from 'md5';
// import { debounce } from '@/utils';
import { UserOutlined, LockOutlined, SafetyOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '@/api';
import moment from 'moment';

const { Search } = Input;

const LoginByThirdView = ({ history, user, dispatch }) => {
  // console.log(props);
  const [form] = Form.useForm();
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [buttonTitle, setbuttonTitle] = useState('获取验证码');
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [type, setType] = useState('登录');
  const types = ['登录', '申请账号'];
  const { getFieldValue, resetFields, setFieldsValue } = form;
  let timer = null;
  let sum = 60;
  useEffect(() => {
    const password = localStorage.getItem('password');
    if (password) {
      const username = localStorage.getItem('name');
      form.setFieldsValue({
        pwd: atob(password),
        uname: username,
      });
    }
    return () => clearInterval(timer);
  }, []);


  const onFinish = async values => {
    // console.log('Success:', values);
    const _data = { ...values, password: md5(values.password) };
    if (type === '登录') {

      const r = await dispatch({
        type: 'user/login',
        payload: _data,
      });
      if (r.overtime && +r.isUser !== 1) {
        if (

          moment(r.overtime).valueOf() <
          moment()
            .add(7, 'day')
            .valueOf()
        ) {
          Modal.info({
            title: '温馨提醒',
            content: '当前会员有效提临近或已过期，请去充值，以免给您造成损失',
          });
        }
      }

      if (r) {
        localStorage.setItem('isLogin', true);
        if (values.remember) {
          localStorage.setItem('name', values.name);
          localStorage.setItem('password', btoa(values.password));
        } else {
          localStorage.clear();
        }
        history.push('/');
      }
    } else {
      const r = await dispatch({
        type: 'user/addbyself',
        payload: _data,
      });
      if (r) {
        message.success('注册成功！');
        setTimeout(() => {
          handleClick('登录');
        }, 1000);
      }

    }
  };

  const handleClick = (type) => {
    resetFields();
    setFieldsValue({ 'name': '', 'password': '' });
    setType(type);
  };

  const handleVerification = async () => {
    const { validateFields } = form;

    const a = await validateFields(['phone']);
    const r = await api.User.getVerfication(a);
    if (r) {
      message.success('验证码发送成功');
      timer = setInterval(() => {
        sum--;
        setbuttonTitle(`${sum}s`);
        setbuttonDisable(true);
        if (sum === 0) {
          sum = 60;
          setbuttonDisable(false);
          setbuttonTitle('获取验证码');
          clearInterval(timer);
        }
      }, 1000, true);
    }
  };


  const costomForm = type === '登录' ? (<>
    <Form.Item name="name"
      rules={[{ required: true, message: '请输入账号' }, {
        max: 32, message: '账号最多32位字符',
      }, {
        min: 3, message: '账号最少3位字符'
      }]}
    // initialValue={name}
    >
      <Input
        allowClear
        prefix={<UserOutlined style={{ color: '#ccc' }} />}
        placeholder="请输入账号"
      />
    </Form.Item>
    <Form.Item name="password"
      rules={[{ required: true, message: '请输入密码!' }, {
        min: 6, message: '密码不能少于6位'
      }]}
    // initialValue={password}
    >
      <Input.Password
        allowClear
        prefix={<LockOutlined style={{ color: '#ccc' }} />}
        visibilityToggle
        placeholder="请输入密码"
      />
    </Form.Item>
    <div className="between-room">
      <Form.Item
        className="margin0"
        name="remember"
        valuePropName={'checked'}
        initialValue={true}>
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Link to="/forget" className="span-link margin-b-12">
        忘记密码
      </Link>
    </div>
    <div>
      <Button block type="primary" htmlType="submit" className="login-form-button">
        登录
    </Button>
    </div>
  </ >) :
    (<>
      <Form.Item name="name" rules={[{ required: true, message: '请输入账号' }, {
        max: 32, message: '账号最多32位字符',
      }, {
        min: 3, message: '账号最少3位字符'
      }]} >
        <Input
          prefix={<UserOutlined style={{ color: '#ccc' }} />}
          placeholder="请输入账号"
          allowClear
        />
      </Form.Item>
      <Row>
        <Col span={12}>
          <Form.Item name="password"
            rules={[{ required: true, message: '输入密码' }, {
              min: 6, message: '请输入至少6位的密码'
            }]}>
            <Input.Password
              prefix={<LockOutlined style={{ color: '#ccc' }} />}
              placeholder="输入密码" visibilityToggle
              allowClear
              autocomplete="new-password"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="repassword"
            rules={[{
              validator: (rules, value, callback) => {
                if (value !== getFieldValue('password')) {
                  callback('密码不一致');
                }
                callback();
              }
            }]}>
            <Input.Password
              autocomplete="new-password"
              prefix={<LockOutlined style={{ color: '#ccc' }} />}
              visibilityToggle
              placeholder="确认密码"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="phone"
        rules={[{
          validator: phoneValidator
        }]}>
        <Input
          prefix={<PhoneOutlined style={{ color: '#ccc' }} />}
          placeholder="请输入号码"
          allowClear
        />
      </Form.Item>
      {/*

      <Row>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator('trueName', {
              rules: [{ required: true, message: '请输入真实姓名!' }],
            })(
              <Input
                prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入真实姓名"
                allowClear
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{
                // validator: validatorMobile
              }],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入号码"
                allowClear
              />,
            )}
          </Form.Item>
        </Col>
      </Row>*/}

      <Form.Item name="verification"
        rules={[{ required: true, message: '请输入验证码' }]}>
        <Search
          allowClear
          prefix={<SafetyOutlined style={{ color: '#ccc' }} />}
          placeholder="输入验证码" onSearch={() => handleVerification()} enterButton={<Button style={{ width: 102 }} disabled={buttonDisable} type="primary">{buttonTitle}</Button>}
        />
      </Form.Item>
      <div>
        <Button block type="primary" htmlType="submit" className="login-form-button">
          注册
      </Button>
      </div>
    </ >);
  return (
    <div className="login-room">
      <div className="login-form" style={type === '登录' ? { width: 300 } : { width: 350 }}>
        <div className="login-head">
          {types.map(item => <h3 onClick={() => handleClick(item)} key={item} className={item === type ? 'active' : ''}>{item}</h3>)}
        </div>
        <Form onFinish={onFinish} form={form}>
          {costomForm}
        </Form>
      </div>
    </div>
  );

};


export default connect((user) => ({
  user
}))(LoginByThirdView);



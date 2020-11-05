import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
// import { stringify } from 'querystring';
import { ConfigProvider, Modal } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
class SecurityLayout extends React.PureComponent {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    const { location, dispatch, isLogin } = this.props;
    // console.log(location);
    if (
      !isLogin &&
      (location.pathname !== '/login' && location.pathname !== '/forget')
    ) {
      const r = await dispatch({
        type: 'user/check',
      });
      // console.log(r);
      // console.log(moment(r.overtime).format('YYYY-MM-DD'));
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

    }
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    // const isLogin = currentUser && currentUser.userid;
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }

    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }

    return (
      <>
        {isReady && <ConfigProvider locale={zhCN}>{children}</ConfigProvider>}
      </>
    );
  }
}
export default connect(({ user }) => ({
  user: user.data,
  isLogin: user.status,
}))(SecurityLayout);

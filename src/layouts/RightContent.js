import React from 'react';
import img from '@/assets/nav_logout.png';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;

const RightContent = (props) => {

  const { dispatch } = props;
  const handleClick = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出吗',
      onOk() {
        dispatch({
          type: 'user/loginOut',
        });
      },
      onCancel() {
        console.log('取消');
      },
    });
  };
  return (
    <div>
      <div onClick={handleClick} className="hl-btn">
        <img
          style={{ width: 20, height: 20, marginRight: 16 }}
          src={img}
          alt=""
        />
      </div>
    </div>
  );
};


export default RightContent;

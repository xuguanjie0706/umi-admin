

/**
 * @memberof module:components
 * @description 图片上传
 * @function PeopleCardUpload
 * @param {object} value 数据
 * @param {function} onChange 函数
 * @param {string} desc  描述
 * @param {object} styles 样式
 * @default 身份证正面
 * @return 组件
 * @example <PeopleCardUpload />
 */


import React, { useState, useEffect } from 'react';
import { Upload, message, Progress } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './index.less';
import api from '@/api';
import compass from './compass';
import reloadImg from './assets/btn_reupload.png';
import config from '@/utils/config';

const PeopleCardUpload = props => {
  const {
    desc = '身份证正面',
    styles = { width: 222, height: 140 },
    checkSize = false,
    value,
    onChange,
  } = props;

  // const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);
  const [complete, setComplete] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (value) setImageUrl(config.url + value);
  }, [value]);

  const onUploadProgress = progressEvent => {
    const completeActive =
      (progressEvent.loaded / progressEvent.total).toFixed(2) * 100 || 0;
    setComplete(completeActive);
    if (completeActive === 100) {
      setTimeout(() => {
        setIsShow(false);
      }, 500);
    }
  };

  const upload = async e => {
    const { file } = e;
    if (checkSize) {
      const [width, height] = await new Promise((resolve) => {
        const img = new Image();
        const _URL = window.URL || window.webkitURL;
        img.onload = function () {
          resolve([this.width, this.height]);
        };
        img.src = _URL.createObjectURL(file);
      });
      // console.log(width, height, checkSize);
      if (width !== checkSize.width || height !== checkSize.height) {
        return message.error('请上传正确尺寸的图片！');
      }
    }


    const smallFile = await compass(file, 0.8);

    try {
      const formData = new FormData();
      formData.append('files', smallFile);
      setIsShow(true);
      setStatus('active');
      const r = await api.File.upload({ data: formData, onUploadProgress });
      // console.log(r);
      if (r) {
        const absoluteUrl = config.url + r;
        console.log(absoluteUrl);
        onChange(r);
        setImageUrl(absoluteUrl);
      } else {
        setStatus('exception');
      }
    } catch (error) {
      console.log(error);
      setIsShow(false);
    }
  };

  return (
    <Upload accept="image/*" customRequest={upload} showUploadList={false}>
      <div className="people-card-upload" style={styles}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {!isShow ? (
          <div className={`people-card-upload-modal ${imageUrl ? 'done' : ''}`}>
            {imageUrl ? (
              <img style={{ width: 40 }} src={reloadImg} alt="" />
            ) : (
                <div className="icon-r">
                  {' '}
                  <PlusOutlined />
                </div>
              )}

            <p>
              {imageUrl ? (
                <span style={{ color: 'white' }}>重新上传</span>
              ) : (
                  desc
                )}
            </p>
          </div>
        ) : (
            <div className="progress">
              {isShow && (
                <Progress
                  width={60}
                  // strokeColor="#fff"
                  status={status}
                  type="circle"
                  percent={complete}
                />
              )}
            </div>
          )}
      </div>
    </Upload>
  );
};

export default PeopleCardUpload;

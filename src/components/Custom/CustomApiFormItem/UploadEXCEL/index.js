/* eslint-disable react/jsx-no-target-blank */
/**
 * @memberof module:components
 * @description EXCEL 上传
 * @function UploadEXCEL
 * @param {object} value 数据 
 * @param {function} onChange 函数 
 * @param {string} desc  描述  默认{身份证正面}
 * @param {number} amount 剩余数量
 * @param {string} targetUrl 模板路径
 * @return 组件
 * @example <UploadEXCEL />
 */

import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import Icon, { CloudUploadOutlined } from '@ant-design/icons';
import xlsx from 'xlsx';
import api from '@/api';
import iconFile from './assets/icon_file.png';
import deleteIcon from './assets/btn_trashbin.png';

import './index.less';

const iconFileImg = () => {
  return (
    <>
      {' '}
      <img src={iconFile} alt="" />
    </>
  );
};

const deleteIconImg = () => {
  return (
    <>
      {' '}
      <img src={deleteIcon} alt="" />
    </>
  );
};

const UploadEXCEL = props => {
  const {
    value,
    onChange,
    targetUrl,
    amount,
    desc = '单次上传最多导入1万条记录 单次手机号每天最多分发5次',
  } = props;

  const [url, setUrl] = useState(value);
  const [len, setLen] = useState(0);
  // const [isUpload, setUpload] = useState(false);
  const deleteItem = () => {
    setUrl('');
    onChange('');
  };

  // useEffect(() => {
  //   onChange(url);
  // }, [url]);
  const beforeUpload = file => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    return new Promise(resolve => {
      reader.onload = event => {
        const { result } = event.target;
        const workbook = xlsx.read(result, { type: 'binary' });
        const data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
        setLen(data.length);

        const isNext = data.length < 10000;
        if (!isNext) {
          message.error('单次上传最多导入10000条数据!');
        }
        const isNextToo = data.length <= amount;
        if (!isNextToo) {
          message.error('上传数量大于剩余数量或未选择套餐!');
        }
        resolve(isNext && isNextToo);
      };
    });
  };

  const upload = async e => {
    const { file } = e;

    try {
      const isUpload = await beforeUpload(file);
      if (isUpload) {
        const formData = new FormData();
        formData.append('file', file);
        const r = await api.File.upload({ data: formData });
        if (r) {
          const { absoluteUrl } = r;
          await setUrl(absoluteUrl);
          onChange(absoluteUrl);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="upload-excel">
      <div className="upload-excel-header">
        <Upload
          accept=".xlsx"
          customRequest={upload}
          showUploadList={false}

        // beforeUpload={beforeUpload}
        >
          <Button type="primary" ghost>
            <CloudUploadOutlined />
            上传文件
          </Button>
        </Upload>
        <a
          disabled={!amount}
          style={{ marginLeft: 10 }}
          href={targetUrl}
          download="批量分发"
        >
          下载模板
        </a>
      </div>
      {!value && (
        <div style={{ marginTop: 10 }} className="star">
          {desc}
        </div>
      )}
      {url && (
        <div className="upload-excel-body ">
          <div className="upload-excel-body-cell">
            <div className="upload-title-room">
              <Icon component={iconFileImg} />
              <span className="upload-title">{url}</span>
              <Icon onClick={deleteItem} component={deleteIconImg} />
            </div>
            <span className="star" style={{ marginLeft: 'auto' }}>
              识别到{len}条记录
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadEXCEL;

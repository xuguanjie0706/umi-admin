import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import config from '@/utils/config';
import api from '@/api';


function setFileList(arr) {
  return arr.map((item, index) => {
    const obj = {};
    const nameArr = item.split('.');
    obj.url = config.url + item;
    obj.uid = index;
    obj.name = nameArr[0] + index + '.' + nameArr[1];
    return obj;
  });
}
const UploadPic = (props) => {
  const {
    value = [],
    onChange,
    maxLength = 9,
    title = '图片上传',
    request = api.File.upload,
    ...options
  } = props;

  // console.log(options, maxLength);
  const [list, setlist] = useState([]);
  const [imgList, setImgList] = useState([]);


  useEffect(() => {
    if (value) {
      setlist(value);
    }
  }, []);

  useEffect(() => {
    setImgList(setFileList(list));
  }, [list]);


  const upload = async (e) => {
    // console.log(e);
    const { file } = e;

    const formData = new FormData();
    formData.append('files', file);
    console.log(list.length);
    if (list.length >= maxLength) {
      return message.error('超出可上传数量');
    }
    const r = await request({ data: formData });
    if (r) {
      const _list = [...list, r];
      setlist(_list);
      onChange(_list);
      // const absoluteUrl = config.url + r;
      // console.log(absoluteUrl);
      // onChange(r);
      // setImageUrl(absoluteUrl);
    }
    // customRequest;
  };

  const remove = (e) => {
    const _list = list.filter(item => e.url.indexOf(item) === -1);
    setlist(_list);
    onChange(_list);
  };
  return <div>
    <Upload
      onRemove={remove}
      listType="picture"
      customRequest={upload}
      fileList={[...imgList]}
      {...options}
    >
      <Button icon={<UploadOutlined />}>{title}</Button>
    </Upload>
  </div>;
};

export default UploadPic;

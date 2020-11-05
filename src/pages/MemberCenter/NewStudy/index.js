
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import api from '@/api';
const MakeMoney = () => {
  const [url, setUrl] = useState('');
  const initLoad = async () => {
    const r = await api.Config.getonebysimple({
      name: '新手教程'
    });
    if (r & r !== true) {
      setUrl(r);
    }
  };
  useEffect(() => {
    initLoad();
  }, []);
  return (
    <Card title="新手教程">
      <video width="100%" controls src={url ? url : 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}></video>
    </Card>
  );
};

export default MakeMoney;

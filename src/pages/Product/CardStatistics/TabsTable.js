import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import { Tabs } from 'antd';
import api from '@/api';
import moment from 'moment';

const { TabPane } = Tabs;
const CustomTabsTable = (props) => {
  const { tabList, tableChild, form, columns, setSelectedKey } = props;
  // console.log(tableChild);
  const [status, setStatus] = useState('1');
  const [trueColumns, setColumns] = useState(columns);

  useEffect(() => {
    const resultColumns = columns.filter(item => {
      if (item.type) {
        return item.type.includes(status);
      } else {
        return true;
      }
    });
    setColumns([...resultColumns]);
  }, [status, tableChild]);

  const callback = async (key) => {
    await setStatus(key);
    // await setSelectedKey([]);
    form.setFieldsValue({
      isLook: key === '1' ? true : false
    });

    tableChild && tableChild.initData(form.getFieldsValue(), true);
  };

  return (
    <>
      <Tabs type="card" defaultActiveKey={status} onChange={callback}>
        {tabList.map(item => <TabPane tab={item.title} key={item.key} />)
        }
      </Tabs>
      <CustomTable

        {...props}
        status={status}
        columns={trueColumns}
      // request={api[fileName].page}
      />
    </>
  );
};

export default CustomTabsTable;

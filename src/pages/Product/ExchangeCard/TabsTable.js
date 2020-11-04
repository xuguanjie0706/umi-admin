import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import { Tabs } from 'antd';
import api from '@/api';
import moment from 'moment';

const { TabPane } = Tabs;
const CustomTabsTable = (props) => {
  const { tabList, tableChild, form, columns } = props;
  // console.log(tableChild);
  const [status, setStatus] = useState('0');
  const [trueColumns, setColumns] = useState(columns);

  useEffect(() => {
    // console.log(status);
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
      status: +key !== 0 ? key : undefined
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



import React, { forwardRef, useState, useEffect } from 'react';
import { Tree, Button, Icon, Modal, message, } from 'antd';
import ModalForm from './Form';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const { TreeNode, DirectoryTree } = Tree;

const defaultTreeData = [{
  code: 'mix',
  name: 'SaaS系统',
  children: [{
    code: 'mix-1',
    name: '杂项管理',
    children: [{
      code: 'mix-1-1',
      name: '杂项管理',
    }, {
      code: 'mix-1-2',
      name: '杂项管理',
    }, {
      code: 'mix-1-3',
      name: '杂项管理',
    }, {
      code: 'mix-1-4',
      name: '杂项管理',
    }]
  }, {
    code: 'mix-2',
    name: '杂项管理',
  }]
}];

const CustomTree = forwardRef((props, ref) => {
  const { value, onChange } = props;
  // console.log(value);
  const arrCode = [];
  // let expandedKeys = []
  const [treeData, setTreeData] = useState(value || []);
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [defaultData, setDefaultData] = useState({ id: null });
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    // console.log(value);
    if (value) {
      setTreeData(value);
      const _expandedKeys = [];
      customLoop(value, (a) => _expandedKeys.push(a));
      setExpandedKeys(_expandedKeys);
    } else {
      setTreeData([]);
    }
  }, [value]);

  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const customLoop = (data, callback) => {
    // console.log(data);
    data.forEach(item => {
      if (item.children) {
        callback(item.code);
        customLoop(item.children, callback);
      }
    });
  };

  const loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      if (item.code === key) {
        return callback(item, index, arr);
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };

  const Drop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // console.log(dropKey, dragKey, dropPos, dropPosition);
    // console.log(123);
    const data = [...treeData];
    // console.log(data, dragKey);
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setTreeData(data);
  };


  const getNode = (item, first) => {
    return <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div className="halove-btn" onClick={() => handleTreeNodeClick({ ...item, type: 1 })} size="small">{item.name}
        {!first && < CloseOutlined onClick={(e) => handleClick(e, item)} style={{ fontSize: 10, color: '#ccc' }} />}
      </div>
      <PlusCircleOutlined onClick={() => handleTreeNodeClick({ ...item, type: 2 })} />
    </div >;
  };

  const handleTreeNodeClick = (item) => {
    const { type } = item;
    if (type === 2) {
      item.oldCode = item.code;
      item.oldName = item.name;
      delete item.code;
      delete item.name;
    }
    setDefaultData(item);
    modelChild.handleShow();
  };

  const handleClick = (e, item) => {
    e.stopPropagation();
    Modal.confirm({
      title: '删除提示',
      content: item.name + ' 删除后不可修改',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const data = [...treeData];
        loop(data, item.code, (item, index, arr) => {
          arr.splice(index, 1);
        });
        setTreeData(data);
        // console.log('OK');
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  const loopNode = (data, first) => {
    return data.map(item => {
      arrCode.push(item.code);
      // expandedKeys.push(item.code)
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.code} title={getNode(item, first)}>
            {loopNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.code} title={getNode(item)} />;
    });
  };


  const handleEdit = async (value) => {
    try {
      const { code, type, name, oldCode } = value;

      const data = [...treeData];
      console.log(123);
      if (type === 1) {
        loop(data, code, item => {
          item.name = name;
        });
      } else {
        if (arrCode.includes(code)) {
          message.error('该菜单有code重复');
          throw new Error('错误');
        }
        loop(data, oldCode, item => {
          item.children = item.children || [];
          item.children.push(value);
        });
        const _expandedKeys = [oldCode, ...expandedKeys];
        setExpandedKeys(_expandedKeys);
      }
      await setTreeData(data);
      return new Promise(resolve => {
        resolve(true);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject();
      });
    }


    // modelChild.handleClose()
  };

  const handleExpand = (a) => {

    setExpandedKeys(a);
  };

  return (
    <span className="menuTree" ref={ref}>
      <Tree
        onDrop={Drop}
        showLine
        draggable
        showIcon
        expandedKeys={expandedKeys}
        onExpand={handleExpand}
        autoExpandParent
        defaultExpandAll
        defaultExpandParent
      >
        {loopNode(treeData, true)}
      </Tree>
      <ModalForm
        formItemLayout={{
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        }}
        title="新增"
        onRef={modelRef}
        defaultData={defaultData}
        request={(value) => handleEdit(value)}
        // callback={() => tableChild && tableChild.initData()}
        isClearn={false}
      />
    </span >
  );
});


export default CustomTree;

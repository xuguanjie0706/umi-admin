import React, { forwardRef, useState, useEffect } from 'react';
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;

// const generateTree = (treeNodes = [], checkedKeys = []) => {
//   return treeNodes.map(({ children, ...props }) => (
//     <TreeNode {...props} disabled={checkedKeys.includes(props.code)} key={props.code}>
//       {generateTree(children, checkedKeys)}
//     </TreeNode>
//   ));
// };

const CustomTreeTransfer = forwardRef((props, ref) => {
  const { value, onChange, treeData } = props;


  const [targetKeys, setTargetKeys] = useState(value || []);
  const [selectedKeys, setSelectedKeys] = useState(value || []);
  const [lastList, setLastList] = useState(value || []);


  // console.log(treeData, value, targetKeys, selectedKeys);

  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
    if (value) {
      setSelectedKeys(value);
      setTargetKeys(value);
    }

  }, [value]);
  const transferDataSource = [];

  function flatten(list = []) {
    list.forEach(item => {
      item.key = item.code;
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(treeData);


  const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
  };

  const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
      <TreeNode title={props.name} {...props} disabled={checkedKeys.includes(props.code)} key={props.code}>
        {generateTree(children, checkedKeys)}
      </TreeNode>
    ));
  };


  const handleChange = (value) => {
    setTargetKeys(value);
    onChange(value);
  };

  const handleSelectChange = (s, t) => {
    if (s && s.length) {
      if (t.length !== lastList.length) {
        setLastList(t);
        return setSelectedKeys(t);
      }
      setSelectedKeys(s);
      setLastList([]);
    } else {
      setSelectedKeys(t);
    }
  };
  return (
    <span ref={ref}>
      <Transfer
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        dataSource={transferDataSource}
        className="tree-transfer"
        render={item => <span > {item.name}</span>}
        showSelectAll={false}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        listStyle={{ width: '50%' }}
      >
        {({ direction, onItemSelect, selectedKeys }) => {
          if (direction === 'left') {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandParent
                defaultExpandAll
                autoExpandParent
                checkedKeys={checkedKeys}
                onCheck={(
                  _,
                  {
                    node: {
                      props: { eventKey },
                    },
                  },
                ) => {
                  if (!checkedKeys.includes(eventKey)) {
                    const _selectKeys = [eventKey, ...selectedKeys];
                    setSelectedKeys(_selectKeys);
                    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                  } else {
                    const _selectKeys = checkedKeys.filter(item => item !== eventKey);
                    setSelectedKeys(_selectKeys);
                    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                  }

                }}
              >
                {generateTree(treeData, targetKeys)}
              </Tree>
            );
          }
        }}
      </Transfer >
    </span >
  );
});


export default CustomTreeTransfer;

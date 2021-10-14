import React, { useCallback, useState } from 'react';
// 组件
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tree } from 'antd';
// 类型声明
import type { ExpandedKeys, TreeNodeData, TreeNodeDataList } from './data';
import EditableCell from '@/components/Common/EditableCell';
import { cloneDeep, isString } from 'lodash';

// 树形节点使用的数据
const treeNodeDataSource: TreeNodeDataList = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const TreeNode = () => {
  const [expandedKeys, setExpandedKeys] = useState<ExpandedKeys>([]);
  const [treeNodeData, setTreeNodeData] = useState<TreeNodeDataList>(treeNodeDataSource);

  /**
   * 展开树形节点
   */
  const onExpand = useCallback((keys: ExpandedKeys = []) => {
    setExpandedKeys(keys);
  }, []);

  /**
   * 修改标题内容
   * @param record
   */
  const handleSave = useCallback(
    (value: string, nodeData: TreeNodeData) => {
      // 此时nodeData为浅拷贝，因此可以简单使用此变量直接修改到值
      const newNodeData = nodeData;
      newNodeData.title = value;
      // 不使用cloneDeep无法触发页面渲染
      setTreeNodeData(cloneDeep(treeNodeData));
    },
    [treeNodeData],
  );

  /**
   * 自定义渲染标题
   */
  const titleRender = useCallback(
    (nodeData: TreeNodeData) => {
      const { title = '' } = nodeData;
      /**
       * 此处在TreeNodeData类型定义中，title类型为React.ReactNode，但是实际使用中为string，因此进行了特殊处理
       */
      const titleStr = isString(title) ? title : '';

      return (
        <EditableCell
          editable={true}
          value={titleStr}
          save={(value: any) => {
            handleSave(value, nodeData);
          }}
        />
      );
    },
    [handleSave],
  );

  return (
    <PageContainer>
      <Card>
        <Tree
          onExpand={onExpand}
          titleRender={titleRender}
          expandedKeys={expandedKeys}
          treeData={treeNodeData}
        />
      </Card>
    </PageContainer>
  );
};

export default TreeNode;

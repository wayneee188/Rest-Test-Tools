import React, { useEffect, useRef, useState } from 'react';
// 组件
import { Input } from 'antd';
// 类型
import type { EditableCellProps } from './data';
// 样式
import styles from './index.less';

const EditableCell = ({ editable, value, save }: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  // 切换编辑状态
  const toggleEdit = () => {
    setEditing(!editing);
  };

  let childNode: React.ReactNode = <></>;

  if (editable) {
    childNode = editing ? (
      <Input
        ref={inputRef}
        onPressEnter={toggleEdit}
        onBlur={toggleEdit}
        onChange={(e) => save(e.target.value)}
        value={value}
      />
    ) : (
      <div className={styles.editable_cell} onClick={toggleEdit}>
        {value}
      </div>
    );
  }

  /**
   * 直接返回childNode,会提示
   *  EditableCell”不能用作 JSX 组件。
       其返回类型 "{} | ReactElement<any, string | JSXElementConstructor<any>>" 不是有效的 JSX 元素。
       类型“{}”缺少类型“ReactElement<any, any>”中的以下属性: type, props, keyts(2786)
   */
  return <>{childNode}</>;
};

export default EditableCell;

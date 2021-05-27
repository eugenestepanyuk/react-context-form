import { useState } from 'react';
import { Drawer, Button, Input, Table } from 'antd';
import { EllipsisOutlined, CloseOutlined } from '@ant-design/icons';
import { departmentColumns, categoryColumns } from '../utils/columns';
import { departmentData, categoryData } from '../utils/data';

export default function DrawerComponent({ value = {}, onChange, name }) {
  console.log('value2: ', value);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  let columns, data = null;
  columns = name === "department" ? departmentColumns() : categoryColumns();
  data = name === "department" ? departmentData() : categoryData();

  const onClickRow = (record) => {
    onContentChange(name === "department" ? record.department : record.category);
  };

  const triggerChange = (changedValue) => {
    onChange?.({
      content,
      ...value,
      ...changedValue,
    });
  };

  const onContentChange = (value) => {
    const newContent = value;

    if (value !== null) {
      setContent(newContent);
    }

    triggerChange({
      content: newContent,
    });
  };

  const onClearContent = () => {
    setContent(null);
    triggerChange({
      content: undefined,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Input name={name} value={value.content || content} />
      <Button icon={<EllipsisOutlined />} onClick={showDrawer} />
      <Button icon={<CloseOutlined />} onClick={onClearContent} />
      <Drawer
        key="top"
        placement="top"
        closable={false}
        onClose={onClose}
        visible={visible}
        height="80%"
        destroyOnClose={true}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              OK
            </Button>
          </div>
        }
      >
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.id}
          onRow={(record) => {
            return {
              onClick: () => {
                onClickRow(record);
              },
              onDoubleClick: () => onClose(),
            };
          }}
        />
      </Drawer>
    </div>
  );
}

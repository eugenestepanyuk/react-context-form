
import { useState } from "react";
import { Drawer, Button, Input, Table } from "antd";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { departmentColumns, categoryColumns } from "../utils/columns";
import { departmentData, categoryData } from "../utils/data";

/**
 * @type {{ [key: string]: { columns: () => any, data: () => any } }}
 */
const INITIAL_VALUES = {
  department: {
    columns: departmentColumns,
    data: departmentData,
  },
  category: {
    columns: categoryColumns,
    data: categoryData,
  },
};

export default function DrawerComponent({ value = {}, onChange, name }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = INITIAL_VALUES[name].columns();
  const data = INITIAL_VALUES[name].data();

  const onClickRow = (record) => {
    onContentChange(record[name]);
  };

  const triggerChange = (changedValue) => {
    onChange?.({
      content,
      ...value,
      ...changedValue,
    });
  };

  const onContentChange = (content) => {
    setContent(content);
    triggerChange({ content });
  };

  const onClearContent = () => {
    setContent(undefined);
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

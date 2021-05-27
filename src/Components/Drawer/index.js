import { useState, useContext } from "react";
import { Drawer, Button, Input, Table } from "antd";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { FormContext } from "../../Context/form.context";
import { DrawerContext } from "../../Context/drawer.context";
import { departmentColumns, categoryColumns } from "../utils/columns";
import { departmentData, categoryData } from "../utils/data";

export default function DrawerComponent({
  name,
  value = {},
  onChange /* type */,
}) {
  console.log("value: ", value);
  const [visible, setVisible] = useState(false);
  const [content /* setContent */] = useState(null);
  const formContext = useContext(FormContext);
  const drawerContext = useContext(DrawerContext);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  let columns,
    data = null;
  columns =
    drawerContext.type === "department"
      ? departmentColumns()
      : categoryColumns();
  data =
    drawerContext.type === "department" ? departmentData() : categoryData();

  const onClickRow = (record) => {
    console.log("record: ", record);
    onContentChange(record[drawerContext.type]);
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
      formContext.сhangeContent(name, newContent);
      // setContent(newContent);
    }

    triggerChange({
      content: newContent,
    });
  };

  const onClearContent = () => {
    formContext.сhangeContent(name, undefined);
    // setContent(null);
    triggerChange({
      content: null,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Input
        name={name}
        value={/* value.content || content */ formContext.content[name]}
      />
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

import { useState, useContext } from 'react';
import { Drawer, Button, Input, Table } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { DrawerContext } from '../../Context/drawer.context';

export default function DrawerComponent() {
    const [visible, setVisible] = useState(false);
    const drawerContext = useContext(DrawerContext);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const columns = [
        {
            dataIndex: 'department',
            key: 'department',
        },
    ];

    const data = [
        { id: 1, department: 'Logistics' },
        { id: 2, department: 'Marketing' },
        { id: 3, department: 'IT' },
        { id: 4, department: 'Management' }
    ];

    const onClickRow = (record) => {
        drawerContext.сhangeContent(record.department);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Input value={drawerContext.content} />
            <Button icon={<EllipsisOutlined />} onClick={showDrawer} />
            <Drawer
                key="top"
                placement="top"
                closable={false}
                onClose={onClose}
                visible={visible}
                height='80%'
                destroyOnClose={true}
                footer={
                    <div style={{ textAlign: 'right' }} >
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary" >OK</Button>
                    </div>
                }
            >
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={record => record.id}
                    onRow={record => {
                        return {
                            onClick: () => { onClickRow(record) },
                            onDoubleClick: () => onClose()
                        }
                    }}
                />
            </Drawer>
        </div>
    );
};
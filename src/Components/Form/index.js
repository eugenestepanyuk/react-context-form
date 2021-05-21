import { Form, Button } from 'antd';
import { DrawerProvider } from '../../Context/drawer.context';
import Drawer from '../Drawer';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

export default function FormComponent() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginTop: '10%' }}
        >
            <Form.Item
                label="Department"
                name="department"
                rules={[
                    {
                        required: true,
                        message: 'Please input department!',
                    },
                ]}
            >
                <DrawerProvider>
                    <Drawer />
                </DrawerProvider>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
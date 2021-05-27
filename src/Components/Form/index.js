import { useContext } from 'react';
import { Form, Button } from 'antd';
import { FormContext } from '../../Context/form.context';
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
    const formContext = useContext(FormContext);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const checkPrice = (_, value) => {
        console.log('value: ', value);
        if (value.content !== null && value.content !== '') {
            return Promise.resolve();
        }

        return Promise.reject(new Error(_.message));
    };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                department: { content: /* null */ formContext.content },
                category: { content: formContext.content }
            }}
            style={{ marginTop: '10%' }}
        >
            <Form.Item
                label="Department"
                name="department"
                rules={[
                    {
                        required: true,
                        message: 'Please select department!',
                        validator: checkPrice
                    },
                ]}
            >
                <DrawerProvider type={'department'}>
                    <Drawer /* type={'department'} */ />
                </DrawerProvider>
            </Form.Item>

            <Form.Item
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please select category!',
                        validator: checkPrice
                    },
                ]}
            >
                <DrawerProvider type={'category'}>
                    <Drawer /* type={'category'} */ />
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
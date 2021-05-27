import { Form, Button } from 'antd';
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
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkPrice = (_, value) => {
    if (value.content) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(_.message));
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        department: { content: null },
        category: { content: null },
      }}
      style={{ marginTop: "10%" }}
    >
      <Form.Item
        label="Department"
        name="department"
        rules={[
          {
            required: true,
            message: "Please select department!",
            validator: checkPrice,
          },
        ]}
      >
          <Drawer name="department" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select category!",
            validator: checkPrice,
          },
        ]}
      >
          <Drawer name="category" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

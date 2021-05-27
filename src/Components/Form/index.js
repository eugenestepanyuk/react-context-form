
import { Form, Button } from "antd";
import Drawer from "../Drawer";

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
  function onFormFinish(values) {
    console.log("Success:", values);
  }

  function onFormFailed(error) {
    console.log("Failed:", error);
  }

  function validator(subject, value) {
    return new Promise((resolve, reject) => {
      if (!value.content) {
        return reject(new Error(subject.message));
      }

      return resolve();
    });
  }

  return (
    <Form
      {...layout}
      onFinish={onFormFinish}
      onFinishFailed={onFormFailed}
      style={{ marginTop: "10%" }}
    >
      <Form.Item
        label="Department"
        name="department"
        rules={[
          {
            required: true,
            message: "Please select department!",
            validator: validator,
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
            validator: validator,
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

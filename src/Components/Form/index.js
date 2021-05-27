import { useContext } from "react";
import { Form, Button } from "antd";
import { FormContext } from "../../Context/form.context";
import { DrawerProvider } from "../../Context/drawer.context";
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
  const formContext = useContext(FormContext);

  const onFinish = () => {
    console.log("Success:", formContext.content);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkPrice = (subject) => {
    console.log("subject: ", subject);
    console.log("value: ", formContext.content[subject.field]);

    return new Promise((resolve, reject) => {
      if (!formContext.content[subject.field]) {
        return reject(new Error(subject.message));
      }

      return resolve();
    });
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        department: formContext.content.department,
        category: formContext.content.category,
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
        <DrawerProvider type="department">
          <Drawer /* type={'department'} */ name="department" />
        </DrawerProvider>
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
        <DrawerProvider type="category">
          <Drawer /* type={'category'} */ name="category" />
        </DrawerProvider>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
  window.location.href = "/teacher";
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage = () => (
  <div className="form">
    <Form
      name="wrap"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        className="mb-0"
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="mb-0"
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
            type: "password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        className="mb-0"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  </div>
);
export default LoginPage;

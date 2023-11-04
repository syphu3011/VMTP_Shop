import React from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#000000",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#ffffff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  paddingInline: 50,
  minHeight: 120,
  lineHeight: "120px",
  color: "#000000",
  backgroundColor: "#ffffff",
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  OTP?: string;
};
export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={[0, 48]}
      ></Space>
      <Layout>
        <Header style={headerStyle}>Xác thực đăng nhập ADMIN</Header>
        <Content style={contentStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={() => navigate("/Admin")}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Nhập mã OTP"
                name="OTP"
                rules={[{ required: true, message: "Hãy nhập OTP" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </>
  );
}
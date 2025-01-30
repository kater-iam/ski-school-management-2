import { useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Typography } from "antd";
import type { InputRef } from "antd";
import { useEffect, useRef } from "react";

const { Title } = Typography;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();
  const [form] = Form.useForm();
  const emailRef = useRef<InputRef>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onFinish = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "24px",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          スキースクール管理システム
        </Title>
        <Form<{ email: string; password: string }>
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="メールアドレス"
            rules={[{ required: true, message: "メールアドレスを入力してください" }]}
          >
            <Input ref={emailRef} size="large" placeholder="example@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="パスワード"
            rules={[{ required: true, message: "パスワードを入力してください" }]}
          >
            <Input.Password size="large" placeholder="●●●●●●●●" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}; 

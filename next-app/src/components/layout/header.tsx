import { Layout, Space, Button, theme } from "antd";
import { useLogout } from "@refinedev/core";

export const Header: React.FC = () => {
  const { token } = theme.useToken();
  const { mutate: logout } = useLogout();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  return (
    <Layout.Header style={headerStyles}>
      <Space>
        <Button onClick={() => logout()}>ログアウト</Button>
      </Space>
    </Layout.Header>
  );
}; 
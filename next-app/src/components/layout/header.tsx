import { Layout, Button, Flex } from "antd";
import { useLogout } from "@refinedev/core";

export const Header: React.FC = () => {
  const { mutate: logout } = useLogout();

  return (
    <Layout.Header 
      style={{ 
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Flex gap="middle">
        <Button 
          onClick={() => logout()}
          type="text"
        >
          ログアウト
        </Button>
      </Flex>
    </Layout.Header>
  );
}; 
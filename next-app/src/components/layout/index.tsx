"use client";

import { Layout as AntdLayout } from "antd";
import { Header } from "./header";
import { Sider } from "./sider";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Sider />
      <AntdLayout>
        <Header />
        <AntdLayout.Content style={{ padding: "24px" }}>
          {children}
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};

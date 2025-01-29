import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

export const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "ダッシュボード",
    },
    {
      key: "/lessons",
      icon: <BookOutlined />,
      label: "レッスン",
    },
    {
      key: "/lesson-schedules",
      icon: <CalendarOutlined />,
      label: "レッスンスケジュール",
    },
    {
      key: "/reservations",
      icon: <CalendarOutlined />,
      label: "予約",
    },
    {
      key: "/profiles",
      icon: <UserOutlined />,
      label: "プロフィール",
    },
    {
      key: "/user-levels",
      icon: <TrophyOutlined />,
      label: "ユーザーレベル",
    },
  ];

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ height: "64px", padding: "16px", textAlign: "center" }}>
        <h1 style={{ color: "white", margin: 0 }}>
          {collapsed ? "SS" : "スキースクール"}
        </h1>
      </div>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Layout.Sider>
  );
}; 
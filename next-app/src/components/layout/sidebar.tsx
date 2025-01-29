'use client'
import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  ScheduleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import { useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useNavigation();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "ダッシュボード",
    },
    {
      type: "group",
      label: "レッスン",
      children: [
        {
          key: "/lessons",
          icon: <UnorderedListOutlined />,
          label: "レッスン一覧",
        },
        {
          key: "/lessons/create",
          icon: <PlusOutlined />,
          label: "レッスン作成",
        },
      ],
    },
    {
      type: "group",
      label: "スケジュール",
      children: [
        {
          key: "/lesson-schedules",
          icon: <ScheduleOutlined />,
          label: "スケジュール一覧",
        },
        {
          key: "/lesson-schedules/create",
          icon: <PlusOutlined />,
          label: "スケジュール作成",
        },
      ],
    },
    {
      type: "group",
      label: "予約",
      children: [
        {
          key: "/reservations",
          icon: <CalendarOutlined />,
          label: "予約一覧",
        },
        {
          key: "/reservations/create",
          icon: <PlusOutlined />,
          label: "予約作成",
        },
      ],
    },
    {
      type: "group",
      label: "ユーザー",
      children: [
        {
          key: "/profiles",
          icon: <TeamOutlined />,
          label: "プロフィール一覧",
        },
        {
          key: "/profiles/create",
          icon: <PlusOutlined />,
          label: "プロフィール作成",
        },
      ],
    },
    {
      type: "group",
      label: "スキーレベル",
      children: [
        {
          key: "/user-levels",
          icon: <TrophyOutlined />,
          label: "レベル一覧",
        },
        {
          key: "/user-levels/create",
          icon: <PlusOutlined />,
          label: "レベル作成",
        },
      ],
    },
  ];

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ 
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div 
        style={{ 
          height: "64px", 
          padding: "16px", 
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.1)",
          margin: "16px",
          borderRadius: "4px",
        }}
      >
        <h1 style={{ color: "white", margin: 0, fontSize: collapsed ? "16px" : "20px" }}>
          {collapsed ? "SS" : "スキースクール"}
        </h1>
      </div>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={collapsed ? [] : ["レッスン", "スケジュール", "予約", "ユーザー", "スキーレベル"]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => push(key)}
      />
    </Layout.Sider>
  );
}; 
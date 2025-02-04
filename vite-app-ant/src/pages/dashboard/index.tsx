import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Table, Space } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";

const { Title } = Typography;

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const today = dayjs().startOf('day');
  const tomorrow = dayjs().endOf('day');

  const { data, isLoading } = useList({
    resource: "lesson_schedules",
    filters: [
      {
        field: "start_time",
        operator: "gte",
        value: today.toISOString(),
      },
      {
        field: "start_time",
        operator: "lte",
        value: tomorrow.toISOString(),
      },
    ],
    pagination: {
      pageSize: 100,
    },
    meta: {
      select: "*, lessons(name), profiles!instructor_id(first_name, last_name)",
    },
  });

  const columns = [
    {
      title: "時間",
      dataIndex: "start_time",
      render: (value: string) => dayjs(value).format("HH時mm分"),
    },
    {
      title: "レッスン",
      dataIndex: ["lessons", "name"],
    },
    {
      title: "参加人数",
      dataIndex: "current_participants",
      render: (value: number, record: any) => `${value}/${record.lessons.max_participants}`,
    },
    {
      title: "インストラクター",
      dataIndex: ["profiles", "first_name"],
      render: (_: string, record: any) => 
        `${record.profiles.last_name} ${record.profiles.first_name}`,
    },
    {
      title: "状態",
      dataIndex: "status",
      render: (value: string) => {
        const statusMap: Record<string, string> = {
          open: "予約受付中",
          closed: "予約締切",
          cancelled: "キャンセル",
        };
        return statusMap[value] || value;
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Title level={2} style={{ marginBottom: "2rem" }}>
            スキースクール管理システム
          </Title>
          <Button
            type="primary"
            size="large"
            icon={<CalendarOutlined />}
            onClick={() => navigate("/reservations/create")}
            style={{
              height: "120px",
              width: "300px",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            レッスン予約
          </Button>
        </div>
      </Card>

      <Card title="本日のレッスン">
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </Space>
  );
}; 

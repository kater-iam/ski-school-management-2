import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Table, Space } from "antd";
import { CalendarOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

const { Title } = Typography;

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs().startOf('day'));
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // 現在の日付のレッスンを取得
  const { data: currentData, isLoading } = useList({
    resource: "lesson_schedules",
    filters: [
      {
        field: "start_time",
        operator: "gte",
        value: currentDate.toISOString(),
      },
      {
        field: "start_time",
        operator: "lt",
        value: currentDate.add(1, 'day').toISOString(),
      },
    ],
    pagination: {
      pageSize: 100,
    },
    meta: {
      select: "*, lessons(name), profiles!instructor_id(first_name, last_name)",
    },
  });

  // 前の日のレッスンを確認
  const { data: prevData } = useList({
    resource: "lesson_schedules",
    filters: [
      {
        field: "start_time",
        operator: "lt",
        value: currentDate.toISOString(),
      },
    ],
    pagination: {
      pageSize: 1,
    },
    sorters: [{ field: "start_time", order: "desc" }],
  });

  // 次の日のレッスンを確認
  const { data: nextData } = useList({
    resource: "lesson_schedules",
    filters: [
      {
        field: "start_time",
        operator: "gt",
        value: currentDate.add(1, 'day').toISOString(),
      },
    ],
    pagination: {
      pageSize: 1,
    },
    sorters: [{ field: "start_time", order: "asc" }],
  });

  useEffect(() => {
    setHasPrevious(!!prevData?.data?.length);
    setHasNext(!!nextData?.data?.length);
  }, [prevData, nextData]);

  const handlePrevious = () => {
    if (prevData?.data?.[0]) {
      const prevDate = dayjs(prevData.data[0].start_time).startOf('day');
      setCurrentDate(prevDate);
    }
  };

  const handleNext = () => {
    if (nextData?.data?.[0]) {
      const nextDate = dayjs(nextData.data[0].start_time).startOf('day');
      setCurrentDate(nextDate);
    }
  };

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

      <Card 
        title={
          <Space>
            <Button 
              type="text" 
              icon={<LeftOutlined />} 
              disabled={!hasPrevious}
              onClick={handlePrevious}
            >
              前の日
            </Button>
            {currentDate.format("YYYY年MM月DD日")}のレッスン
            <Button 
              type="text" 
              icon={<RightOutlined />} 
              disabled={!hasNext}
              onClick={handleNext}
            >
              次の日
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={currentData?.data}
          loading={isLoading}
          rowKey="id"
          pagination={false}
          locale={{
            emptyText: "この日のレッスンはありません",
          }}
        />
      </Card>
    </Space>
  );
}; 

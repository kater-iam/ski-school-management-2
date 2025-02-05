import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Table, Space, Calendar, Badge, Row, Col } from "antd";
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
  const [monthData, setMonthData] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs().startOf('month'));
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  // 月のデータを取得
  const { data: monthlyData, refetch: refetchMonthlyData } = useList({
    resource: "lesson_schedules",
    filters: [
      {
        field: "start_time",
        operator: "gte",
        value: currentMonth.startOf('month').toISOString(),
      },
      {
        field: "start_time",
        operator: "lt",
        value: currentMonth.endOf('month').toISOString(),
      },
    ],
    pagination: {
      pageSize: 1000,
    },
  });

  useEffect(() => {
    if (monthlyData?.data) {
      setMonthData(monthlyData.data);
    }
  }, [monthlyData]);

  // 現在の日付のレッスンを取得
  const { data: currentData, isLoading, refetch: refetchCurrentData } = useList({
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
      select: `*,
        lessons!inner(name, max_participants),
        profiles!instructor_id(first_name, last_name),
        reservations!lesson_schedule_id(status)`,
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

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dayData = monthData.filter(item => 
      dayjs(item.start_time).format('YYYY-MM-DD') === dateStr
    );
    
    if (dayData.length > 0) {
      return [
        {
          type: 'success',
          content: `${dayData.length}件`,
        },
      ];
    }
    return [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return listData.length > 0 ? (
      <span style={{ 
        fontSize: '11px',
        color: '#666',
        position: 'absolute',
        right: '4px',
        bottom: '4px'
      }}>
        {listData[0].content}
      </span>
    ) : null;
  };

  const cellRender = (date: Dayjs, info: { type: string }) => {
    if (info.type === 'date') {
      return (
        <div className="ant-picker-cell-inner" style={{ position: 'relative' }}>
          {dateCellRender(date)}
        </div>
      );
    }
    return null;
  };

  const handleCalendarSelect = async (date: Dayjs) => {
    setCurrentDate(date.startOf('day'));
    await refetchCurrentData();
    // 選択された日付のデータを表示するためにスクロール
    const lessonListCard = document.querySelector('.lesson-list-card');
    if (lessonListCard) {
      lessonListCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMonthChange = async (date: Dayjs) => {
    setCurrentMonth(date.startOf('month'));
    // 月を変更する際に現在の日付も同じ月の日付に更新
    if (date.month() !== currentDate.month()) {
      setCurrentDate(date.startOf('month'));
      await refetchCurrentData();
    }
    setIsMonthPickerOpen(false);
    await refetchMonthlyData();
  };

  const headerRender = ({ value, onChange }: any) => {
    return (
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '16px',
        position: 'relative'
      }}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => handleMonthChange(currentMonth.subtract(1, 'month'))}
        >
          前月
        </Button>
        <Button
          type="link"
          onClick={() => setIsMonthPickerOpen(true)}
          style={{ margin: '0 16px', fontSize: '16px', fontWeight: 'bold' }}
        >
          {currentMonth.format('YYYY年MM月')}
        </Button>
        <Button
          type="text"
          icon={<RightOutlined />}
          onClick={() => handleMonthChange(currentMonth.add(1, 'month'))}
        >
          次月
        </Button>
        {isMonthPickerOpen && (
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'white',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            width: '280px'
          }}>
            <Calendar
              fullscreen={false}
              mode="year"
              value={currentMonth}
              onChange={(date) => {
                handleMonthChange(date);
              }}
              onSelect={(date) => {
                handleMonthChange(date);
              }}
            />
          </div>
        )}
      </div>
    );
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
      render: (value: string, record: any) => (
        <a onClick={() => navigate(`/lesson_schedules/show/${record.id}`)} style={{ cursor: 'pointer' }}>
          {value}
        </a>
      ),
    },
    {
      title: "参加人数",
      render: (_: any, record: any) => {
        const reservations = record.reservations || [];
        const currentParticipants = reservations.filter((r: any) => r.status !== 'キャンセル').length;
        const maxParticipants = record.lessons?.max_participants || 0;
        return `${currentParticipants}/${maxParticipants}`;
      },
    },
    {
      title: "インストラクター",
      dataIndex: ["profiles", "first_name"],
      render: (_: string, record: any) => 
        record.profiles ? `${record.profiles.last_name} ${record.profiles.first_name}` : "未定",
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
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<CalendarOutlined />}
              onClick={() => navigate("/reservations/create")}
              style={{
                height: "80px",
                width: "200px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              レッスン予約
            </Button>
            <Button
              type="default"
              size="large"
              icon={<CalendarOutlined />}
              onClick={() => navigate("/lesson_schedules")}
              style={{
                height: "80px",
                width: "200px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              レッスン一覧
            </Button>
          </Space>
        </div>
      </Card>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ width: '100%' }}>
              <Calendar
                value={currentDate}
                onSelect={handleCalendarSelect}
                cellRender={cellRender}
                mode="month"
                fullscreen={false}
                style={{ fontSize: '12px' }}
                headerRender={headerRender}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={16}>
          <Card 
            className="lesson-list-card"
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
                <span style={{ 
                  backgroundColor: dayjs().format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD') 
                    ? '#e6f7ff' 
                    : 'transparent',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {currentDate.format("YYYY年MM月DD日")}のレッスン
                </span>
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
        </Col>
      </Row>
    </Space>
  );
}; 

import { Row, Col, Card, Typography } from "antd";
import { useList } from "@refinedev/core";
import {
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export const Home: React.FC = () => {
  const { data: lessonsData } = useList({
    resource: "lessons",
  });

  const { data: schedulesData } = useList({
    resource: "lesson_schedules",
  });

  const { data: reservationsData } = useList({
    resource: "reservations",
  });

  const { data: profilesData } = useList({
    resource: "profiles",
  });

  return (
    <div>
      <Title level={2}>ダッシュボード</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <BookOutlined style={{ fontSize: 24, marginBottom: 8 }} />
              <Title level={4}>レッスン数</Title>
              <Title level={3}>{lessonsData?.total || 0}</Title>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <CalendarOutlined style={{ fontSize: 24, marginBottom: 8 }} />
              <Title level={4}>スケジュール数</Title>
              <Title level={3}>{schedulesData?.total || 0}</Title>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <CalendarOutlined style={{ fontSize: 24, marginBottom: 8 }} />
              <Title level={4}>予約数</Title>
              <Title level={3}>{reservationsData?.total || 0}</Title>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <UserOutlined style={{ fontSize: 24, marginBottom: 8 }} />
              <Title level={4}>ユーザー数</Title>
              <Title level={3}>{profilesData?.total || 0}</Title>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 
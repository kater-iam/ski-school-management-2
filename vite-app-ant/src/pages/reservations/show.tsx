import { useShow, useOne } from "@refinedev/core";
import { Card, Descriptions, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

export const ReservationsShow = () => {
    const { queryResult } = useShow({
        meta: {
            select: "*, lesson_schedules(*, lessons(*), instructor:profiles(*)), student:profiles(*)",
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const getStatusTag = (status: string) => {
        const statusColors = {
            申し込み: "processing",
            申し込み承認: "success",
            受講済: "default",
            キャンセル: "error",
        };
        return <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "16px" }}>
            <Title level={4}>予約詳細</Title>
            <Card>
                <Descriptions title="予約基本情報" bordered>
                    <Descriptions.Item label="予約番号">{record?.reservation_number}</Descriptions.Item>
                    <Descriptions.Item label="ステータス">
                        {record?.status && getStatusTag(record.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="予約日時">
                        {dayjs(record?.created_at).format("YYYY年MM月DD日 HH時mm分")}
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions title="レッスン情報" bordered style={{ marginTop: "24px" }}>
                    <Descriptions.Item label="レッスン名">
                        {record?.lesson_schedules?.lessons?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="インストラクター">
                        {record?.lesson_schedules?.instructor?.last_name} {record?.lesson_schedules?.instructor?.first_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="開始時間">
                        {dayjs(record?.lesson_schedules?.start_time).format("YYYY年MM月DD日 HH時mm分")}
                    </Descriptions.Item>
                    <Descriptions.Item label="終了時間">
                        {dayjs(record?.lesson_schedules?.end_time).format("YYYY年MM月DD日 HH時mm分")}
                    </Descriptions.Item>
                    <Descriptions.Item label="レッスン料金">
                        ¥{record?.lesson_schedules?.lessons?.price?.toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions title="生徒情報" bordered style={{ marginTop: "24px" }}>
                    <Descriptions.Item label="氏名">
                        {record?.student?.last_name} {record?.student?.first_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="電話番号">
                        {record?.student?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="緊急連絡先">
                        {record?.student?.emergency_contact}
                    </Descriptions.Item>
                </Descriptions>

                {record?.instructor_comment && (
                    <Descriptions title="インストラクターコメント" bordered style={{ marginTop: "24px" }}>
                        <Descriptions.Item>
                            {record.instructor_comment}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Card>
        </div>
    );
};

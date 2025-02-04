import React from "react";
import { useShow, useOne, useMany } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography, Table } from "antd";

const { Title } = Typography;

export const LessonSchedulesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    const { data: lessonData, isLoading: lessonIsLoading } = useOne({
        resource: "lessons",
        id: record?.lesson_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: reservationsData, isLoading: reservationsIsLoading } = useMany({
        resource: "reservations",
        ids: [],
        queryOptions: {
            enabled: !!record?.id,
        },
        meta: {
            select: "*, profiles(*)",
            filter: {
                lesson_schedule_id: {
                    eq: record?.id,
                },
            },
        },
    });

    const reservationsColumns = [
        {
            title: "予約者名",
            dataIndex: ["profiles", "name"],
            key: "name",
        },
        {
            title: "メールアドレス",
            dataIndex: ["profiles", "email"],
            key: "email",
        },
        {
            title: "予約日時",
            dataIndex: "created_at",
            key: "created_at",
            render: (value: string) => <DateField value={value} format="YYYY年MM月DD日 HH時mm分" />,
        },
    ];

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>予約者一覧</Title>
            <Table
                dataSource={reservationsData?.data}
                columns={reservationsColumns}
                loading={reservationsIsLoading}
                rowKey="id"
            />

            <Title level={5}>Id</Title>
            <TextField value={record?.id} />
            <Title level={5}>Lesson</Title>
            {lessonIsLoading ? <>Loading...</> : <>{lessonData?.data?.name}</>}
            <Title level={5}>Start Time</Title>
            <DateField value={record?.start_time} />
            <Title level={5}>End Time</Title>
            <DateField value={record?.end_time} />
            <Title level={5}>Status</Title>
            <TextField value={record?.status} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.created_at} />
            <Title level={5}>Updated At</Title>
            <DateField value={record?.updated_at} />
        </Show>
    );
};

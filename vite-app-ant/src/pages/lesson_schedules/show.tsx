import React from "react";
import { useShow, useOne, useList } from "@refinedev/core";
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

    const { data: reservationsData, isLoading: reservationsIsLoading } = useList({
        resource: "reservations",
        queryOptions: {
            enabled: !!record?.id,
        },
        meta: {
            select: `
                *,
                profiles!student_profile_id (
                    id,
                    first_name,
                    last_name,
                    phone,
                    emergency_contact
                )
            `,
        },
        filters:[
            {
                field: "lesson_schedule_id",
                operator: "eq",
                value: record?.id,
            }
        ]
    });

    console.log('reservationsData:', reservationsData); // デバッグ用

    const reservationsColumns = [
        {
            title: "予約者名",
            dataIndex: ["profiles"],
            key: "name",
            render: (profile: any) => profile ? `${profile.last_name} ${profile.first_name}` : "-",
        },
        {
            title: "電話番号",
            dataIndex: ["profiles", "phone"],
            key: "phone",
            render: (phone: string) => phone || "-",
        },
        {
            title: "緊急連絡先",
            dataIndex: ["profiles"],
            key: "emergency_contact",
            render: (profile: any) => 
                profile?.emergency_contact_name && profile?.emergency_contact_phone
                    ? `${profile.emergency_contact_name} (${profile.emergency_contact_phone})`
                    : "-",
        },
        {
            title: "予約ステータス",
            dataIndex: "status",
            key: "status",
            render: (status: string) => status || "-",
        },
        {
            title: "予約日時",
            dataIndex: "created_at",
            key: "created_at",
            render: (value: string) => value ? <DateField value={value} format="YYYY年MM月DD日 HH時mm分" /> : "-",
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

            <Title level={5}>レッスンスケジュールID</Title>
            <TextField value={record?.id} />
            <Title level={5}>レッスン</Title>
            {lessonIsLoading ? <>Loading...</> : <>{lessonData?.data?.name}</>}
            <Title level={5}>開始時間</Title>
            <DateField value={record?.start_time} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>終了時間</Title>
            <DateField value={record?.end_time} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>ステータス</Title>
            <TextField value={record?.status} />
            <Title level={5}>作成日時</Title>
            <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>更新日時</Title>
            <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
        </Show>
    );
};

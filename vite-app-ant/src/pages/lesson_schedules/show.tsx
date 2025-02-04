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
                    skill_level,
                    address,
                    emergency_contact_name,
                    emergency_contact_phone
                )
            `,
            filter: {
                lesson_schedule_id: {
                    eq: record?.id,
                },
            },
        },
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
            title: "スキルレベル",
            dataIndex: ["profiles", "skill_level"],
            key: "skill_level",
            render: (skill_level: string) => skill_level || "-",
        },
        {
            title: "住所",
            dataIndex: ["profiles", "address"],
            key: "address",
            render: (address: string) => address || "-",
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

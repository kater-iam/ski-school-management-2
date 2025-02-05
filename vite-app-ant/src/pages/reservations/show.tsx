import React from "react";
import { useShow, useOne } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ReservationsShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: lessonScheduleData, isLoading: lessonScheduleIsLoading } = useOne({
        resource: "lesson_schedules",
        id: record?.lesson_schedule_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: profileData, isLoading: profileIsLoading } = useOne({
        resource: "profiles",
        id: record?.student_profile_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>予約ID</Title>
            <TextField value={record?.id} />
            <Title level={5}>レッスンスケジュール</Title>
            {lessonScheduleIsLoading ? <>Loading...</> : <>{lessonScheduleData?.data?.id}</>}
            <Title level={5}>予約者</Title>
            {profileIsLoading ? <>Loading...</> : <>{`${profileData?.data?.last_name} ${profileData?.data?.first_name}`}</>}
            <Title level={5}>予約番号</Title>
            <TextField value={record?.reservation_number} />
            <Title level={5}>ステータス</Title>
            <TextField value={record?.status} />
            <Title level={5}>インストラクターコメント</Title>
            <TextField value={record?.instructor_comment} />
            <Title level={5}>作成日時</Title>
            <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>更新日時</Title>
            <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
        </Show>
    );
};

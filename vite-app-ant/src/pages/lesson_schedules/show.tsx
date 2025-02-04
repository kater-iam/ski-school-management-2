import React from "react";
import { useShow, useOne } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

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

    return (
        <Show isLoading={isLoading}>
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

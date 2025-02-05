import React from "react";
import { useShow } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const LessonLevelsShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>レッスンレベルID</Title>
            <TextField value={record?.id} />
            <Title level={5}>レベル名</Title>
            <TextField value={record?.name} />
            <Title level={5}>説明</Title>
            <TextField value={record?.description} />
            <Title level={5}>作成日時</Title>
            <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>更新日時</Title>
            <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
        </Show>
    );
};

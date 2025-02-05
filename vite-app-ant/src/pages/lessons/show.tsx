import React from "react";
import { useShow } from "@refinedev/core";
import {
    Show,
    TagField,
    TextField,
    NumberField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const LessonsShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>レッスンID</Title>
            <TextField value={record?.id} />
            <Title level={5}>レッスン名</Title>
            <TextField value={record?.name} />
            <Title level={5}>説明</Title>
            <TextField value={record?.description} />
            <Title level={5}>所要時間（分）</Title>
            <NumberField value={record?.duration ?? ""} />
            <Title level={5}>料金</Title>
            <NumberField value={record?.price ?? ""} />
            <Title level={5}>最大参加人数</Title>
            <NumberField value={record?.max_participants ?? ""} />
            <Title level={5}>作成日時</Title>
            <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>更新日時</Title>
            <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
        </Show>
    );
};

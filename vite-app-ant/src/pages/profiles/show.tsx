import React from "react";
import { useShow } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProfilesShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>プロフィールID</Title>
            <TextField value={record?.id} />
            <Title level={5}>姓</Title>
            <TextField value={record?.last_name} />
            <Title level={5}>名</Title>
            <TextField value={record?.first_name} />
            <Title level={5}>電話番号</Title>
            <TextField value={record?.phone} />
            <Title level={5}>緊急連絡先名</Title>
            <TextField value={record?.emergency_contact_name} />
            <Title level={5}>緊急連絡先電話番号</Title>
            <TextField value={record?.emergency_contact_phone} />
            <Title level={5}>作成日時</Title>
            <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
            <Title level={5}>更新日時</Title>
            <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
        </Show>
    );
};

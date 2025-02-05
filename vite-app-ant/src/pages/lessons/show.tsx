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
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <TextField value={record?.id} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Description</Title>
            <TextField value={record?.description} />
            <Title level={5}>Duration</Title>
            <NumberField value={record?.duration ?? ""} />
            <Title level={5}>Price</Title>
            <NumberField value={record?.price ?? ""} />
            <Title level={5}>Max Participants</Title>
            <NumberField value={record?.max_participants ?? ""} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.created_at} />
            <Title level={5}>Updated At</Title>
            <DateField value={record?.updated_at} />
        </Show>
    );
};

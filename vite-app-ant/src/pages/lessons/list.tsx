import React from "react";
import { BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const LessonsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" className="display-none" />
                <Table.Column dataIndex="name" title="レッスン名" />
                <Table.Column dataIndex="description" title="概要" />
                <Table.Column dataIndex="duration" title="レッスン時間（分）" />
                <Table.Column dataIndex="price" title="価格（円）" />
                <Table.Column
                    dataIndex="max_participants"
                    title="最大人数"
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    className="display-none"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["updated_at"]}
                    title="Updated At"
                    className="display-none"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title="操作"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

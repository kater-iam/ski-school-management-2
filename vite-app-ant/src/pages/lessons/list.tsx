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
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="description" title="Description" />
                <Table.Column dataIndex="duration" title="Duration" />
                <Table.Column dataIndex="price" title="Price" />
                <Table.Column
                    dataIndex="max_participants"
                    title="Max Participants"
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["updated_at"]}
                    title="Updated At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title="Actions"
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

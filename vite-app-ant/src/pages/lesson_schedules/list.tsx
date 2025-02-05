import React from "react";
import { BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const LessonSchedulesList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: lessonData, isLoading: lessonIsLoading } = useMany({
        resource: "lessons",
        ids: tableProps?.dataSource?.map((item) => item?.lesson_id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column
                    dataIndex={["lesson_id"]}
                    title="Lesson"
                    render={(value) =>
                        lessonIsLoading ? (
                            <>Loading...</>
                        ) : (
                            lessonData?.data?.find((item) => item.id === value)
                                ?.name
                        )
                    }
                />

                <Table.Column
                    dataIndex={["start_time"]}
                    title="Start Time"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["end_time"]}
                    title="End Time"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="status" title="Status" />
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

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
import { useShow } from "@refinedev/core";
import { Show, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const InstructorSchedulesShow = () => {
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

    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

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

            <Show isLoading={isLoading}>
                <Title level={5}>インストラクターID</Title>
                <TextField value={record?.instructor_id} />
                <Title level={5}>勤務日</Title>
                <DateField value={record?.date} format="YYYY年MM月DD日" />
                <Title level={5}>開始時間</Title>
                <TextField value={record?.start_time} />
                <Title level={5}>終了時間</Title>
                <TextField value={record?.end_time} />
                <Title level={5}>作成日時</Title>
                <DateField value={record?.created_at} format="YYYY年MM月DD日 HH時mm分" />
                <Title level={5}>更新日時</Title>
                <DateField value={record?.updated_at} format="YYYY年MM月DD日 HH時mm分" />
            </Show>
        </List>
    );
};

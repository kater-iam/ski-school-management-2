import React from "react";
import { BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
    CreateButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ReservationsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: lessonScheduleData, isLoading: lessonScheduleIsLoading } = useMany({
        resource: "lesson_schedules",
        ids: tableProps?.dataSource?.map((item) => item?.lesson_schedule_id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
        meta: {
            select: "*, lessons(name)"
        }
    });

    const { data: profileData, isLoading: profileIsLoading } = useMany({
        resource: "profiles",
        ids: tableProps?.dataSource?.map((item) => item?.student_profile_id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="予約ID" />
                <Table.Column
                    dataIndex="reservation_number"
                    title="予約番号"
                />
                <Table.Column
                    dataIndex={["lesson_schedule_id"]}
                    title="レッスン"
                    render={(value) =>
                        lessonScheduleIsLoading ? (
                            <>Loading...</>
                        ) : (
                            lessonScheduleData?.data?.find((item) => item.id === value)?.lessons?.name
                        )
                    }
                />
                <Table.Column
                    dataIndex={["student_profile_id"]}
                    title="予約者"
                    render={(value) =>
                        profileIsLoading ? (
                            <>Loading...</>
                        ) : (
                            (() => {
                                const profile = profileData?.data?.find((item) => item.id === value);
                                return profile ? `${profile.last_name} ${profile.first_name}` : "";
                            })()
                        )
                    }
                />
                <Table.Column
                    dataIndex="status"
                    title="ステータス"
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="予約日時"
                    render={(value: any) => <DateField value={value} format="YYYY年MM月DD日 HH時mm分" />}
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

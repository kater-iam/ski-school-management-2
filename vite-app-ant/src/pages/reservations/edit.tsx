import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const ReservationsEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();

    const Data = query?.data?.data;

    const { selectProps: lessonScheduleSelectProps } = useSelect({
        resource: "lesson_schedules",
        defaultValue: Data?.lesson_schedule_id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="ID"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="レッスンスケジュール"
                    name={"lesson_schedule_id"}
                    rules={[
                        {
                            required: true,
                            message: "レッスンスケジュールを選択してください",
                        },
                    ]}
                >
                    <Select {...lessonScheduleSelectProps} />
                </Form.Item>
                <Form.Item
                    label="予約番号"
                    name={["reservation_number"]}
                    rules={[
                        {
                            required: true,
                            message: "予約番号を選択してください",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker format="YYYY年MM月DD日" />
                </Form.Item>
                <Form.Item
                    label="ステータス"
                    name={["status"]}
                    rules={[
                        {
                            required: true,
                            message: "ステータスを入力してください",
                        },
                    ]}
                >
                    <Select
                        options={[
                            { label: "申し込み", value: "申し込み" },
                            { label: "申し込み承認", value: "申し込み承認" },
                            { label: "受講済", value: "受講済" },
                            { label: "キャンセル", value: "キャンセル" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="インストラクターコメント"
                    name={["instructor_comment"]}
                    rules={[
                        {
                            required: true,
                            message: "インストラクターコメントを入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};

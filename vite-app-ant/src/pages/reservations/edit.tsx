import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { BaseRecord } from "@refinedev/core";

interface LessonSchedule extends BaseRecord {
    id: string;
    start_time: string;
    end_time: string;
    lessons: {
        id: string;
        name: string;
    };
}

export const ReservationsEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const { selectProps: lessonScheduleSelectProps } = useSelect<LessonSchedule>({
        resource: "lesson_schedules",
        optionLabel: (record) => {
            const startTime = dayjs(record.start_time).format("YYYY年MM月DD日 HH時mm分");
            const endTime = dayjs(record.end_time).format("HH時mm分");
            const lessonName = record.lessons?.name || "";
            return `${startTime}～${endTime} ${lessonName}`;
        },
        optionValue: (record) => record.id.toString(),
        meta: {
            select: "*, lessons(id, name)"
        },
        defaultValue: queryResult?.data?.data?.lesson_schedule_id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="予約番号"
                    name={["reservation_number"]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="対象レッスン"
                    name={["lesson_schedule_id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...lessonScheduleSelectProps} />
                </Form.Item>
                <Form.Item
                    label="ステータス"
                    name={["status"]}
                    rules={[
                        {
                            required: true,
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
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Edit>
    );
};

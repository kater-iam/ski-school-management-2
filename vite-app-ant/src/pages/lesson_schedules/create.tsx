import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const LessonSchedulesCreate = () => {
    const { formProps, saveButtonProps, query } = useForm();

    const { selectProps: lessonSelectProps } = useSelect({
        resource: "lessons",
        optionLabel: "name",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="レッスン"
                    name={"lesson_id"}
                    rules={[
                        {
                            required: true,
                            message: "レッスンを選択してください",
                        },
                    ]}
                >
                    <Select {...lessonSelectProps} />
                </Form.Item>
                <Form.Item
                    label="開始時間"
                    name={["start_time"]}
                    rules={[
                        {
                            required: true,
                            message: "開始時間を選択してください",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker format="YYYY年MM月DD日 HH時mm分" showTime={{ format: 'HH:mm' }} />
                </Form.Item>
                <Form.Item
                    label="終了時間"
                    name={["end_time"]}
                    rules={[
                        {
                            required: true,
                            message: "終了時間を選択してください",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker format="YYYY年MM月DD日 HH時mm分" showTime={{ format: 'HH:mm' }} />
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
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

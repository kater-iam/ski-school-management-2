import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export const InstructorSchedulesCreate = () => {
    const { formProps, saveButtonProps, query } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="勤務日"
                    name={["date"]}
                    rules={[
                        {
                            required: true,
                            message: "勤務日を選択してください",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker format="YYYY年MM月DD日" />
                </Form.Item>
                <Form.Item
                    label="開始時間"
                    name={["start_time"]}
                    rules={[
                        {
                            required: true,
                            message: "開始時間を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="終了時間"
                    name={["end_time"]}
                    rules={[
                        {
                            required: true,
                            message: "終了時間を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

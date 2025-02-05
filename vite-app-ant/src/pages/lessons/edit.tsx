import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export const LessonsEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();

    const Data = query?.data?.data;

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
                    label="レッスン名"
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                            message: "レッスン名を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="説明"
                    name={["description"]}
                    rules={[
                        {
                            required: true,
                            message: "説明を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="所要時間（分）"
                    name={["duration"]}
                    rules={[
                        {
                            required: true,
                            message: "所要時間を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="料金"
                    name={["price"]}
                    rules={[
                        {
                            required: true,
                            message: "料金を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="最大参加人数"
                    name={["max_participants"]}
                    rules={[
                        {
                            required: true,
                            message: "最大参加人数を入力してください",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};

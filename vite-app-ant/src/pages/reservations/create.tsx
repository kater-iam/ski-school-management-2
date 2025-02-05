import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Modal, message } from "antd";
import dayjs from "dayjs";
import { BaseRecord } from "@refinedev/core";
import { useCreate } from "@refinedev/core";

interface LessonSchedule extends BaseRecord {
    id: string;
    start_time: string;
    end_time: string;
    lessons: {
        id: string;
        name: string;
    };
}

interface Profile extends BaseRecord {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

type ProfileSelectValue = string | "new";

export const ReservationsCreate = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newProfileForm] = Form.useForm();
    const { mutate: createProfile } = useCreate();

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
        queryOptions: {
            enabled: true,
        },
    });

    const { selectProps: profileSelectProps } = useSelect<Profile>({
        resource: "profiles",
        optionLabel: (record) => `${record.last_name} ${record.first_name}`,
        optionValue: (record) => record.id,
        meta: {
            select: "id, first_name, last_name",
            filter: [
                {
                    field: "role",
                    operator: "eq",
                    value: "student"
                }
            ]
        },
        queryOptions: {
            enabled: true,
        },
    });

    const handleNewProfile = async () => {
        try {
            const values = await newProfileForm.validateFields();
            
            // プロファイルを作成
            await createProfile({
                resource: "profiles",
                values: {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    role: "student",
                },
                successNotification: {
                    message: "プロファイルを作成しました",
                    type: "success",
                },
                errorNotification: {
                    message: "プロファイルの作成に失敗しました",
                    type: "error",
                },
            });

            setIsModalVisible(false);
            newProfileForm.resetFields();
            // プロファイル作成後、selectをリフレッシュする
            profileSelectProps.onSearch?.("");
            message.success("プロファイルを作成しました");
        } catch (error) {
            console.error("Validation failed:", error);
            message.error("プロファイルの作成に失敗しました");
        }
    };

    const profileOptions = [
        ...(profileSelectProps.options || []),
        { label: "新規作成", value: "new" }
    ];

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="対象レッスン"
                    name="lesson_schedule_id"
                    rules={[
                        {
                            required: true,
                            message: "対象レッスンを選択してください"
                        },
                    ]}
                >
                    <Select {...lessonScheduleSelectProps} />
                </Form.Item>

                <Form.Item
                    label="予約者"
                    name="student_profile_id"
                    rules={[
                        {
                            required: true,
                            message: "予約者を選択してください"
                        },
                    ]}
                >
                    <Select
                        {...profileSelectProps}
                        options={profileOptions}
                        onChange={(value: ProfileSelectValue) => {
                            if (value === "new") {
                                setIsModalVisible(true);
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="ステータス"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "ステータスを選択してください"
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
            </Form>

            <Modal
                title="新規ユーザー作成"
                open={isModalVisible}
                onOk={handleNewProfile}
                onCancel={() => {
                    setIsModalVisible(false);
                    newProfileForm.resetFields();
                }}
            >
                <Form form={newProfileForm} layout="vertical">
                    <Form.Item
                        label="姓"
                        name="last_name"
                        rules={[{ required: true, message: "姓を入力してください" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="名"
                        name="first_name"
                        rules={[{ required: true, message: "名を入力してください" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="メールアドレス"
                        name="email"
                        rules={[
                            { required: true, message: "メールアドレスを入力してください" },
                            { type: "email", message: "有効なメールアドレスを入力してください" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Create>
    );
};

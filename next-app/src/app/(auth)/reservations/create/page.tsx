'use client';

import { useResource, useNavigation, useCreate, useSelect, useList } from "@refinedev/core";
import { AuthHeader, AuthHeaderProps } from "@app/(auth)/_components/auth-header";
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@/components/create";

export default function TomatosCreatePage() {
    const { resource } = useResource();
    const { list } = useNavigation();
    const { mutate: create, isLoading: isCreating } = useCreate();

    // 既存のデータを1件取得してフォームのフィールドを自動生成
    const { data: sampleData, isLoading: isLoadingSample, error } = useList({
        resource: resource?.name ?? "",
        pagination: { pageSize: 1 },
    });

    // リレーションデータの取得
    const categorySelect = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        refineCoreProps: {
            resource: resource?.name,
            redirect: false,
            onMutationSuccess: () => {
                list(resource?.name ?? "");
            },
            action: "create",
        },
    });

    const onSubmit = async (values: any) => {
        // idフィールドを除外
        const { id, ...createValues } = values;

        create({
            resource: resource?.name ?? "",
            values: createValues,
            successNotification: {
                message: "正常に作成されました",
                type: "success",
            },
            errorNotification: {
                message: "作成に失敗しました",
                type: "error",
            },
        }, {
            onSuccess: () => {
                list(resource?.name ?? "");
            }
        });
    };

    const breadcrumbData: AuthHeaderProps[] = [
        { title: "Refine Supabase Template", path: "/" },
        { title: `${resource?.label}作成`, path: `/${resource?.name}/create` },
    ];

    // サンプルデータからフィールドを生成
    const sampleRecord = sampleData?.data?.[0] ?? {};
    const fields = Object.entries(sampleRecord)
        .filter(([key]) => {
            // 除外するフィールド
            const excludeFields = ['id', 'created_at', 'updated_at'];
            return !excludeFields.includes(key);
        })
        .map(([key, value]) => {
            // フィールドの型を判定
            let type: 'text' | 'textarea' | 'relation' | 'number' = 'text';
            if (key.endsWith('_id')) {
                type = 'relation';
            } else if (typeof value === 'string' && value.length > 100) {
                type = 'textarea';
            } else if (typeof value === 'number') {
                type = 'number';
            }

            return {
                key,
                label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                type,
            };
        });

    const relationFields = {
        category_id: {
            options: categorySelect.options?.map(option => ({
                label: String(option.label),
                value: String(option.value),
            })),
            isLoading: categorySelect.queryResult?.isFetching ?? false,
        },
    };

    return (
        <>
            <AuthHeader data={breadcrumbData} />
            <Create
                fields={fields}
                isLoading={isLoadingSample}
                error={error}
                resourceLabel={resource?.label}
                onCancel={() => list(resource?.name ?? "")}
                onSubmit={onSubmit}
                isCreating={isCreating}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                relationFields={relationFields}
            />
        </>
    );
}

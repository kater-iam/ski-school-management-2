'use client';

import { useResource, useNavigation, useUpdate, useSelect } from "@refinedev/core";
import { useParams } from "next/navigation";
import { useShowWithRelations } from "@components/hooks/use-show-with-relations";
import { AuthHeader, AuthHeaderProps } from "@app/(auth)/_components/auth-header";
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@/components/edit";

export default function TomatosEditPage() {
    const { resource } = useResource();
    const params = useParams();
    const { list } = useNavigation();
    const { mutate: update, isLoading: isUpdating } = useUpdate();

    const { data, isLoading, isError } = useShowWithRelations({
        resource: resource?.name ?? "",
        id: params.id as string
    });

    // リレーションデータの取得
    const categorySelect = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    const {
        saveButtonProps,
        refineCore: { formLoading, onFinish },
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        refineCoreProps: {
            resource: resource?.name,
            id: params.id as string,
            redirect: false,
            onMutationSuccess: () => {
                list(resource?.name ?? "");
            },
            action: "edit",
        },
        values: data?.data,
    });

    const onSubmit = async (values: any) => {
        // 更新に不要なフィールドを除外
        const updateValues = Object.entries(values)
            .filter(([key, value]) => {
                // 常に除外するフィールド
                const systemFields = ['id', 'created_at'];
                if (systemFields.includes(key)) return false;

                // リレーションデータを除外
                if (typeof value === 'object' && value !== null) return false;
                
                // 複数形で終わるフィールドを除外（リレーションのリスト）
                if (key.endsWith('s') && Array.isArray(value)) return false;

                return true;
            })
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: value
            }), {});

        update({
            resource: resource?.name ?? "",
            id: params.id as string,
            values: updateValues,
            successNotification: {
                message: "正常に更新されました",
                type: "success",
            },
            errorNotification: {
                message: "更新に失敗しました",
                type: "error",
            },
        });
    };

    const breadcrumbData: AuthHeaderProps[] = [
        { title: "Refine Supabase Template", path: "/" },
        { title: `${resource?.label}編集`, path: `/${resource?.name}/edit` },
    ];

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
            <Edit
                data={data?.data}
                isLoading={isLoading || formLoading}
                error={isError ? new Error("データの取得に失敗しました") : undefined}
                resourceLabel={resource?.label}
                onCancel={() => list(resource?.name ?? "")}
                onSubmit={onSubmit}
                isUpdating={isUpdating}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                relationFields={relationFields}
            />
        </>
    );
}

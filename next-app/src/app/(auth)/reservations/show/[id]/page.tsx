'use client';

import { useResource, useNavigation } from "@refinedev/core";
import { useParams } from "next/navigation";
import { useShowWithRelations } from "@components/hooks/use-show-with-relations";
import { AuthHeader, AuthHeaderProps } from "@app/(auth)/_components/auth-header";
import { Show } from "@/components/show";

export default function TomatosShowPage() {
    const { resource } = useResource();
    const params = useParams();
    const { edit } = useNavigation();

    const { data, isLoading, isError } = useShowWithRelations({
        resource: resource?.name ?? "",
        id: params.id as string
    });

    const breadcrumbData: AuthHeaderProps[] = [
        { title: "Refine Supabase Template", path: "/" },
        { title: `${resource?.label}詳細`, path: `/${resource?.name}/show` },
    ]

    return (
        <>
            <AuthHeader data={breadcrumbData} />
            <Show
                data={data?.data}
                isLoading={isLoading}
                error={isError ? new Error("データの取得に失敗しました") : undefined}
                resourceLabel={resource?.label}
                onEdit={(id) => edit(resource?.name ?? "", id)}
                id={params.id as string}
            />
        </>
    );
}

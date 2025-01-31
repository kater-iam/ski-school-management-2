'use client';

import { useResource, useNavigation, useRefineContext, useTranslate } from "@refinedev/core";
import { useParams } from "next/navigation";
import { useShowWithRelations } from "@components/hooks/use-show-with-relations";
import { AuthHeader, AuthHeaderProps } from "@app/(auth)/_components/auth-header";
import { Show } from "@/components/show";

export default function TomatosShowPage() {
    const { resource } = useResource();
    const params = useParams();
    const { edit } = useNavigation();
    const refineContext = useRefineContext()
    const translate = useTranslate()

    const { data, isLoading, isError } = useShowWithRelations({
        resource: resource?.name ?? "",
        id: params.id as string
    });
    
    const breadcrumbData: AuthHeaderProps[] = [
        { title: refineContext.options.title.text as string, path: "/" },
        { title: translate(`resources.${resource?.name}.titles.list`), path: `/${resource?.name}` },
        { title: translate(`resources.${resource?.name}.titles.show`), path: null },
    ]

    return (
        <>
            <AuthHeader data={breadcrumbData} />
            <Show
                data={data?.data}
                isLoading={isLoading}
                error={isError ? new Error("データの取得に失敗しました") : undefined}
                onEdit={(id) => edit(resource?.name ?? "", id)}
                id={params.id as string}
            />
        </>
    );
}

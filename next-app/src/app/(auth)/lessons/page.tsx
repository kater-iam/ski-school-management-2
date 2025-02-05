"use client";

import React from "react";
import { useResourceWithRelations } from "@/components/hooks/use-resource-with-relations";
import { AuthHeader, AuthHeaderProps } from "../_components/auth-header";
import { List } from "@/components/list";
import { HttpError, useRefineContext, useResource, useTitle, useTranslate } from "@refinedev/core";

export default function Page() {
    const refineContext = useRefineContext()
    const { resource } = useResource()
    const { data, isLoading, error } = useResourceWithRelations();
    const translate = useTranslate()
    
    // データの準備
    const items = React.useMemo(() => {
        if (!data?.data) return [];
        return Array.isArray(data.data) ? data.data : [data.data];
    }, [data]);

    const breadcrumbData: AuthHeaderProps[] = [
        { title: refineContext.options.title.text as string, path: "/" },
        { title: translate(`resources.${resource?.name}.titles.list`), path: null },
    ]

    return (
        <>
            <AuthHeader data={breadcrumbData} />
            <div className="w-full p-8">
                <List
                    data={items}
                    isLoading={isLoading}
                    error={error as HttpError}
                />
            </div>
        </>
    );
}
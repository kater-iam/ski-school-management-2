"use client";

import React from "react";
import { useResourceWithRelations } from "@/components/hooks/use-resource-with-relations";
import { AuthHeader, AuthHeaderProps } from "../_components/auth-header";
import { List } from "@/components/list";
import { HttpError, useResource, useTitle } from "@refinedev/core";

export default function Page() {
    const { resource } = useResource();
    const { data, isLoading, error } = useResourceWithRelations();
        
    // データの準備
    const items = React.useMemo(() => {
        if (!data?.data) return [];
        return Array.isArray(data.data) ? data.data : [data.data];
    }, [data]);

    const breadcrumbData: AuthHeaderProps[] = [
        { title: "Refine Supabase Template", path: "/" },
        { title: `${resource?.meta?.label}一覧`, path: `/${resource?.name}` },
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
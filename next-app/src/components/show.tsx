"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Pencil } from "lucide-react";
import { formatDateToJapanese, isDateField, getRelationName } from "@/lib/utils";
import { RelationButton } from "@/components/ui/relation-detail";
import { HttpError, useResource, useTranslate } from "@refinedev/core";

interface ShowProps {
    data: Record<string, any>;
    isLoading: boolean;
    error?: Error | HttpError | null;
    onEdit?: (id: string) => void;
    id?: string;
}

// フィールド名を翻訳する関数
const getFieldLabel = (key: string, translate: (key: string) => string, resourceName?: string) => {
    const translationKey = `resources.${resourceName}.fields.${key}`;
    const translated = translate(translationKey);

    // 翻訳が見つからない場合はデフォルトの表示を使用
    if (translationKey === translated) {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return translated;
};

export const Show: React.FC<ShowProps> = ({
    data,
    isLoading,
    error,
    onEdit,
    id,
}) => {
    const { resource } = useResource();
    const translate = useTranslate();

    // リソース名の翻訳を取得
    const resourceName = translate(`resources.${resource?.name}.name`);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error.message}</div>;
    if (!data) return <div>No data</div>;

    // リレーションのデータを取得
    const relations = Object.entries(data ?? {}).filter(([key]) =>
        typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])
    );

    // 通常のフィールドを取得（リレーション以外）
    const fields = Object.entries(data ?? {}).filter(([key, value]) =>
        typeof value !== 'object' || value === null || Array.isArray(value)
    );

    return (
        <div className="w-full p-8">
            <div className="pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {translate(`resources.${resource?.name}.titles.show`)}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {resourceName}の詳細情報を表示しています。
                        </p>
                    </div>
                    {onEdit && id && (
                        <Button
                            onClick={() => onEdit(id)}
                            className="flex items-center gap-2"
                        >
                            <Pencil className="h-4 w-4" />
                            編集
                        </Button>
                    )}
                </div>
                <Separator orientation="horizontal" className="my-4 bg-border h-px" />
            </div>
            <div className="w-full">
                <div className="space-y-6">
                    {/* Normal Fields */}
                    {fields.map(([key, value]) => (
                        <div key={key} className="space-y-2">
                            <div className="text-sm font-medium">
                                {getFieldLabel(key, translate, resource?.name)}
                            </div>
                            <div className="rounded-md border bg-muted/50 px-4 py-2">
                                {isDateField(key, value) ? (
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        {formatDateToJapanese(value as string)}
                                    </div>
                                ) : (
                                    String(value)
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Relations */}
                    {relations.map(([key, value]) => (
                        <div key={key} className="space-y-2">
                            <div className="text-sm font-medium">
                                {getFieldLabel(key, translate, resource?.name)}
                            </div>
                            <RelationButton
                                relationName={getRelationName(key)}
                                relationData={value as Record<string, any>}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDateToJapanese, isDateField, getRelationName, pluralize } from "@/lib/utils";
import { HttpError } from "@refinedev/core";

type RelationOption = {
    label: string;
    value: string;
};

interface EditProps {
    data: Record<string, any>;
    isLoading: boolean;
    error?: Error | HttpError | null;
    resourceLabel?: string;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    isUpdating: boolean;
    register: any;
    handleSubmit: any;
    errors: any;
    setValue: any;
    relationFields?: {
        [key: string]: {
            options?: RelationOption[];
            isLoading: boolean;
        };
    };
}

export const Edit: React.FC<EditProps> = ({
    data,
    isLoading,
    error,
    resourceLabel = "",
    onCancel,
    onSubmit,
    isUpdating,
    register,
    handleSubmit,
    errors,
    setValue,
    relationFields = {},
}) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error.message}</div>;
    if (!data) return <div>No data</div>;

    // 通常のフィールドを取得（リレーション以外）
    const fields = Object.entries(data ?? {}).filter(([key, value]) => 
        typeof value !== 'object' || value === null || Array.isArray(value)
    );

    // 編集可能なフィールドを判定
    const isEditableField = (key: string): boolean => {
        const nonEditableFields = ['id', 'created_at', 'updated_at'];
        return !nonEditableFields.includes(key);
    };

    return (
        <div className="w-full p-8">
            <div className="pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{resourceLabel}編集</h2>
                        <p className="text-sm text-muted-foreground">
                            {resourceLabel}の情報を編集できます。
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            キャンセル
                        </Button>
                        <Button 
                            type="submit" 
                            form="edit-form"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "更新中..." : "保存"}
                        </Button>
                    </div>
                </div>
                <Separator orientation="horizontal" className="my-4 bg-border h-px" />
            </div>
            <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    {/* Normal Fields */}
                    {fields.map(([key, value]) => {
                        const isIdField = key.endsWith('_id');
                        if (isIdField && isEditableField(key)) {
                            const relationData = relationFields[key];
                            return (
                                <div key={key} className="space-y-2">
                                    <div className="text-sm font-medium">{pluralize(key.replace('_id', ''))}</div>
                                    {relationData?.isLoading ? (
                                        <div>リレーション候補を取得中...</div>
                                    ) : (
                                        <Select
                                            defaultValue={String(value ?? "")}
                                            onValueChange={(newValue) => setValue(key, newValue)}
                                        >
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="選択してください" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {relationData?.options?.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                    {errors[key] && (
                                        <p className="text-sm text-red-500">{String(errors[key]?.message)}</p>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={key} className="space-y-2">
                                <div className="text-sm font-medium">{key}</div>
                                {isEditableField(key) ? (
                                    <>
                                        {typeof value === 'string' && value.length > 100 ? (
                                            <Textarea
                                                {...register(key)}
                                                defaultValue={value}
                                                className="bg-white"
                                            />
                                        ) : (
                                            <Input
                                                {...register(key)}
                                                defaultValue={String(value ?? "")}
                                                type={typeof value === 'number' ? 'number' : 'text'}
                                                className="bg-white"
                                            />
                                        )}
                                        {errors[key] && (
                                            <p className="text-sm text-red-500">{String(errors[key]?.message)}</p>
                                        )}
                                    </>
                                ) : (
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
                                )}
                            </div>
                        );
                    })}
                </div>
            </form>
        </div>
    );
}; 
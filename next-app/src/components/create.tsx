"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pluralize } from "@/lib/utils";
import { HttpError, useResource, useTranslate } from "@refinedev/core";

type RelationOption = {
    label: string;
    value: string;
};

interface Field {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'relation' | 'number';
}

interface CreateProps {
    fields: Field[];
    isLoading: boolean;
    error?: Error | HttpError | null;    
    onCancel: () => void;
    onSubmit: (values: any) => void;
    isCreating: boolean;
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

export const Create: React.FC<CreateProps> = ({
    fields,
    isLoading,
    error,    
    onCancel,
    onSubmit,
    isCreating,
    register,
    handleSubmit,
    errors,
    setValue,
    relationFields = {},
}) => {
    const { resource } = useResource();
    const translate = useTranslate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error.message}</div>;

    return (
        <div className="w-full p-8">
            <div className="pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {translate(`resources.${resource?.name}.titles.create`)}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            新しい{resource?.name}を作成します。
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
                            form="create-form"
                            disabled={isCreating}
                        >
                            {isCreating ? "作成中..." : "作成"}
                        </Button>
                    </div>
                </div>
                <Separator orientation="horizontal" className="my-4 bg-border h-px" />
            </div>
            <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    {fields.map(({ key, type }) => {
                        if (type === 'relation') {
                            const relationData = relationFields[key];
                            return (
                                <div key={key} className="space-y-2">
                                    <div className="text-sm font-medium">
                                        {getFieldLabel(key.replace('_id', ''), translate, resource?.name)}
                                    </div>
                                    {relationData?.isLoading ? (
                                        <div>リレーション候補を取得中...</div>
                                    ) : (
                                        <Select
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
                                <div className="text-sm font-medium">
                                    {getFieldLabel(key, translate, resource?.name)}
                                </div>
                                {type === 'textarea' ? (
                                    <Textarea
                                        {...register(key)}
                                        className="bg-white"
                                    />
                                ) : (
                                    <Input
                                        {...register(key)}
                                        type={type}
                                        className="bg-white"
                                    />
                                )}
                                {errors[key] && (
                                    <p className="text-sm text-red-500">{String(errors[key]?.message)}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </form>
        </div>
    );
}; 
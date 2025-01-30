"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pluralize } from "@/lib/utils";
import { HttpError } from "@refinedev/core";

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
    resourceLabel?: string;
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

export const Create: React.FC<CreateProps> = ({
    fields,
    isLoading,
    error,
    resourceLabel = "",
    onCancel,
    onSubmit,
    isCreating,
    register,
    handleSubmit,
    errors,
    setValue,
    relationFields = {},
}) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error.message}</div>;

    return (
        <div className="w-full p-8">
            <div className="pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{resourceLabel}作成</h2>
                        <p className="text-sm text-muted-foreground">
                            新しい{resourceLabel}を作成します。
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
                    {fields.map(({ key, label, type }) => {
                        if (type === 'relation') {
                            const relationData = relationFields[key];
                            return (
                                <div key={key} className="space-y-2">
                                    <div className="text-sm font-medium">{pluralize(key.replace('_id', ''))}</div>
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
                                <div className="text-sm font-medium">{label}</div>
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
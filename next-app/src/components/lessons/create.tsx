"use client";

import React from "react";
import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export const LessonsCreate = () => {
    const { list } = useNavigation();

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <div className="py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">レッスン作成</h2>
                        <p className="text-sm text-muted-foreground">
                            新しいレッスンを作成します。
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            list("lessons");
                        }}
                    >
                        レッスン一覧へ戻る
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />
            <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">レッスン名</Label>
                    <Input
                        id="name"
                        {...register("name", {
                            required: "レッスン名は必須です",
                        })}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">説明</Label>
                    <Textarea
                        id="description"
                        className="min-h-[100px]"
                        {...register("description", {
                            required: "説明は必須です",
                        })}
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">
                            {errors.description.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duration">所要時間（分）</Label>
                    <Input
                        id="duration"
                        type="number"
                        {...register("duration", {
                            required: "所要時間は必須です",
                            valueAsNumber: true,
                            min: {
                                value: 30,
                                message: "30分以上で設定してください",
                            },
                        })}
                    />
                    {errors.duration && (
                        <p className="text-sm text-destructive">
                            {errors.duration.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="max_participants">最大参加人数</Label>
                    <Input
                        id="max_participants"
                        type="number"
                        {...register("max_participants", {
                            required: "最大参加人数は必須です",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "1人以上で設定してください",
                            },
                        })}
                    />
                    {errors.max_participants && (
                        <p className="text-sm text-destructive">
                            {errors.max_participants.message as string}
                        </p>
                    )}
                </div>

                <div className="flex justify-start">
                    <Button 
                        type="submit" 
                        size="lg"
                        disabled={formLoading}
                    >
                        {formLoading ? "保存中..." : "保存"}
                    </Button>
                </div>
            </form>
        </>
    );
};

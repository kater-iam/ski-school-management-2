"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(1, "レッスン名は必須です"),
    description: z.string().min(1, "説明は必須です"),
    duration: z.number().min(1, "所要時間は1分以上である必要があります"),
    max_participants: z.number().min(1, "最大参加人数は1人以上である必要があります"),
});

type FormValues = z.infer<typeof formSchema>;

export const LessonsEdit = () => {
    const { goBack } = useNavigation();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            duration: 0,
            max_participants: 0,
        },
    });

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = form;

    return (
        <div className="container mx-auto py-4">
            <div className="mb-4">
                <Button variant="outline" onClick={() => goBack()}>
                    戻る
                </Button>
            </div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-8">
                    <div className="grid gap-4 py-4">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }: { field: ControllerRenderProps<FormValues, "name"> }) => (
                                <FormItem>
                                    <FormLabel>レッスン名</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="description"
                            render={({ field }: { field: ControllerRenderProps<FormValues, "description"> }) => (
                                <FormItem>
                                    <FormLabel>説明</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="duration"
                            render={({ field }: { field: ControllerRenderProps<FormValues, "duration"> }) => (
                                <FormItem>
                                    <FormLabel>所要時間（分）</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="max_participants"
                            render={({ field }: { field: ControllerRenderProps<FormValues, "max_participants"> }) => (
                                <FormItem>
                                    <FormLabel>最大参加人数</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => goBack()}>
                            キャンセル
                        </Button>
                        <Button type="submit" disabled={formLoading}>
                            保存
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

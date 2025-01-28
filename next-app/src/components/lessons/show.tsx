"use client";

import React from "react";
import { useShow, useNavigation } from "@refinedev/core";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const LessonsShow = () => {
    const { goBack } = useNavigation();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-4">
            <div className="mb-4">
                <Button variant="outline" onClick={() => goBack()}>
                    戻る
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{record?.name}</CardTitle>
                    <CardDescription>レッスン詳細</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div>
                            <h3 className="font-medium">説明</h3>
                            <p>{record?.description}</p>
                        </div>
                        <div>
                            <h3 className="font-medium">所要時間</h3>
                            <p>{record?.duration}分</p>
                        </div>
                        <div>
                            <h3 className="font-medium">最大参加人数</h3>
                            <p>{record?.max_participants}人</p>
                        </div>
                        <div>
                            <h3 className="font-medium">作成日時</h3>
                            <p>
                                {record?.created_at && new Date(record.created_at).toLocaleString('ja-JP', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">更新日時</h3>
                            <p>
                                {record?.updated_at && new Date(record.updated_at).toLocaleString('ja-JP', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

import { useList, useResource } from "@refinedev/core";
import pluralize from "pluralize";
import { useMemo } from "react";

// 1. TypeScript の型定義例
type RecordType = {
    [key: string]: any;
};

function getRelationsFromItem(item: RecordType): string[] {
    // `_id` で終わるキーをすべて取得
    const keys = Object.keys(item);
    return keys.filter((key) => key.endsWith("_id"));
}

/**
 * レコード配列内のすべての要素から `_id` を収集するユーティリティ関数
 */
function getAllRelations(data: RecordType[]): string[] {
    const relationSet = new Set<string>();
    for (const item of data) {
        const relations = getRelationsFromItem(item);
        relations.forEach((r) => relationSet.add(r));
    }
    return Array.from(relationSet);
}

/**
 * 取得したいカラム(select)文字列を生成
 */
function buildSelectQuery(data: RecordType[]): string {
    const relations = getAllRelations(data);
    if (relations.length === 0) {
        // 関連が無ければ "*" のみ
        return "*";
    }
    const relationQueries = relations.map((relation) => {
        // 例: user_id -> user -> users(*)
        const resourceName = relation.replace("_id", "");
        const pluralizedName = pluralize(resourceName);
        return `${pluralizedName}(*)`;
    });

    // 例: "*, users(*), articles(*)"
    return ["*", ...relationQueries].join(", ");
}

/**
 * 関連テーブルを考慮したデータを取得するカスタムフック
 */
export const useResourceWithRelations = () => {
    const { resource } = useResource();

    // 1回目: とりあえず "*" で取得
    const {
        data: initialData,
        isLoading: isLoadingInitial,
        error: errorInitial,
    } = useList<RecordType>({
        resource: resource?.name ?? "",
        meta: { select: "*" },
    });

    // 2回目の select クエリを決定
    const selectQuery = useMemo(() => {
        const items = initialData?.data;
        if (!items || items.length === 0) {
            return "*";
        }
        return buildSelectQuery(items);
    }, [initialData]);

    // 2回目: 必要に応じて詳細取得
    const {
        data: finalData,
        isLoading: isLoadingFinal,
        error: errorFinal,
    } = useList<RecordType>({
        resource: resource?.name ?? "",
        meta: { select: selectQuery },
    });

    return {
        data: finalData,
        isLoading: isLoadingInitial || isLoadingFinal,
        error: errorInitial || errorFinal,
    };
}

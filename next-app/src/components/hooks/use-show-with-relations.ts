import { BaseRecord, useShow } from "@refinedev/core";
import pluralize from "pluralize";

// 1. TypeScript の型定義例
type RecordType = {
    [key: string]: any;
};

function getRelationsFromItem(item: RecordType): string[] {
    // `_id` で終わるキーをすべて取得
    const keys = Object.keys(item);
    const relations = keys.filter((key) => key.endsWith("_id"));
    // _id を除去してリレーション名を取得し、重複を除去
    const baseRelations = Array.from(new Set(relations.map(key => key.replace("_id", ""))));
    // 複数形に変換してリレーション名を生成
    return baseRelations.map(relation => pluralize(relation));
}

/**
 * 取得したいカラム(select)文字列を生成
 */
function buildSelectQuery(relations: string[]): string {
    if (relations.length === 0) {
        // 関連が無ければ "*" のみ
        return "*";
    }

    // リレーションクエリを生成
    const relationQueries = relations.map((relation) => {
        return `${relation}:${relation}(*)`;
    });

    // 例: "*, users:users(*), articles:articles(*)"
    return ["*", ...relationQueries].join(", ");
}

export type UseShowWithRelationsParams = {
    resource: string;
    id: string;
    /**
     * 追加で取得したいリレーション
     * @example ["categories", "users"]
     */
    additionalRelations?: string[];
};

export type UseShowWithRelationsReturn = {
    data: BaseRecord | undefined;
    isLoading: boolean;
    isError: boolean;
};

/**
 * リレーションを含むデータを取得するカスタムフック
 * @example
 * ```tsx
 * const { data, isLoading, isError } = useShowWithRelations({
 *   resource: "posts",
 *   id: "1"
 * });
 * ```
 */
export const useShowWithRelations = ({
    resource,
    id,
    additionalRelations = []
}: UseShowWithRelationsParams): UseShowWithRelationsReturn => {
    // まず基本的なデータを取得
    const { queryResult: initialResult } = useShow<BaseRecord>({
        resource,
        id,
        meta: { select: "*" }
    });

    // 初期データからリレーションを検出
    const detectedRelations = initialResult.data?.data 
        ? getRelationsFromItem(initialResult.data.data)
        : [];

    // 検出されたリレーションと追加のリレーションをマージ（重複を除去）
    const allRelations = Array.from(new Set([...detectedRelations, ...additionalRelations]));
    
    // リレーションを含むselectクエリを生成
    const selectQuery = buildSelectQuery(allRelations);

    // リレーションを含むデータを取得
    const { queryResult } = useShow<BaseRecord>({
        resource,
        id,
        meta: { select: selectQuery }
    });

    return {
        data: queryResult.data,
        isLoading: queryResult.isLoading || initialResult.isLoading,
        isError: queryResult.isError || initialResult.isError
    };
};

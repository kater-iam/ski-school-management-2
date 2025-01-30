import { type ClassValue, clsx } from "clsx"; import { twMerge } from "tailwind-merge";
import moment from "moment";
import "moment/locale/ja"; // 日本語ロケールを使用
import pluralize from "pluralize";

moment.locale("ja");

export { pluralize };

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

/**
 * 日付フィールドかどうかを判定する
 */
export const isDateField = (key: string, value: any): boolean => {
    // フィールド名による判定
    const dateFieldPatterns = [
        /_at$/i,      // created_at, updated_at など
        /_date$/i,    // birth_date, start_date など
        /^date/i,     // date_of_birth など
    ];
    
    const hasDatePattern = dateFieldPatterns.some(pattern => pattern.test(key));
    
    // 値による判定
    const isISODateString = typeof value === 'string' && 
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
    
    return hasDatePattern && isISODateString;
};

/**
 * 日付を日本語フォーマット（YYYY年MM月DD日）に変換
 */
export const formatDateToJapanese = (dateString: string): string => {
    return moment(dateString).format("YYYY年MM月DD日");
};

/**
 * 時間を日本語フォーマット（HH時mm分）に変換
 */
export const formatTimeToJapanese = (dateString: string): string => {
    return moment(dateString).format("HH時mm分");
};

/**
 * リレーションのカラム名を取得
 */
export const getRelationName = (key: string): string => {
    return key.endsWith('_id') ? key.replace('_id', '') : key;
};

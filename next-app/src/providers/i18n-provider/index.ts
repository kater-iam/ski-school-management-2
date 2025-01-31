'use client';

import i18n from "i18next";
import { I18nProvider } from "@refinedev/core";
import { TOptions } from "i18next";

i18n.init({
    resources: {
        ja: {
            translations: {                
                resources: {
                    lessons: {
                        titles: {
                            list: "レッスン一覧",
                            show: "レッスン詳細",
                            create: "レッスン作成",
                            edit: "レッスン編集",
                        },
                        fields: {
                            id: "ID",
                            name: "名前",
                            description: "説明",
                            duration: "時間",
                            max_participants: "最大参加者数",
                            created_at: "作成日",
                            updated_at: "更新日",
                        },
                        name: "レッスン"
                    },
                    reservations: {
                        titles: {
                            list: "予約一覧",
                            show: "予約詳細",
                            create: "予約作成",
                            edit: "予約編集",
                        },
                        fields: {
                            id: "ID",
                            name: "名前",
                            description: "説明",
                            duration: "時間",
                            max_participants: "最大参加者数",
                            created_at: "作成日",
                            updated_at: "更新日",
                        },
                        name: "予約"
                    }
                }
            }
        }
    },
    lng: "ja",
    defaultNS: "translations",
});

export const i18nProvider: I18nProvider = {
    translate: (key: string, params?: TOptions) => i18n.t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
};
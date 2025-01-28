import { dataProvider as supabaseDataProvider } from "@refinedev/supabase";
import { DataProvider, CreateParams, BaseRecord } from "@refinedev/core";
import { supabaseBrowserClient } from "@utils/supabase/client";

export const customDataProvider: DataProvider = {
    ...supabaseDataProvider(supabaseBrowserClient),

    create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({ resource, variables }: CreateParams<TVariables>) => {                
        // リソースに合わせて操作ロジックを記載
        return supabaseDataProvider(supabaseBrowserClient).create<TData, TVariables>({
            resource,
            variables,
        });
    },
};

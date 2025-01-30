import {
  DataProvider,
  BaseRecord,
  GetListParams,
  GetListResponse,
  GetManyParams,
  GetManyResponse,
  CreateParams,
  CreateResponse,
  UpdateParams,
  UpdateResponse,
  GetOneParams,
  GetOneResponse,
  DeleteOneParams,
  DeleteOneResponse,
} from "@refinedev/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

type Tables = Database["public"]["Tables"];
type TableNames = keyof Tables;
type Row<T extends TableNames> = Tables[T]["Row"];

export const generateDataProvider = (
  supabaseClient: SupabaseClient<Database>
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
    pagination,
    filters,
    sorters,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    let query = supabaseClient
      .from(resource as TableNames)
      .select("*", { count: "exact" });

    // フィルターの適用
    if (filters) {
      filters.forEach((filter) => {
        if (filter.operator === "eq") {
          query = query.eq(filter.field, filter.value);
        } else if (filter.operator === "ne") {
          query = query.neq(filter.field, filter.value);
        } else if (filter.operator === "lt") {
          query = query.lt(filter.field, filter.value);
        } else if (filter.operator === "gt") {
          query = query.gt(filter.field, filter.value);
        } else if (filter.operator === "lte") {
          query = query.lte(filter.field, filter.value);
        } else if (filter.operator === "gte") {
          query = query.gte(filter.field, filter.value);
        } else if (filter.operator === "contains") {
          query = query.ilike(filter.field, `%${filter.value}%`);
        } else if (filter.operator === "containss") {
          query = query.like(filter.field, `%${filter.value}%`);
        }
      });
    }

    // ソートの適用
    if (sorters) {
      sorters.forEach((sorter) => {
        query = query.order(sorter.field, {
          ascending: sorter.order === "asc",
        });
      });
    }

    // ページネーションの適用
    const start = (current - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: (data || []) as unknown as TData[],
      total: count || 0,
    };
  },

  getMany: async <TData extends BaseRecord = BaseRecord>({
    resource,
    ids,
  }: GetManyParams): Promise<GetManyResponse<TData>> => {
    const { data, error } = await supabaseClient
      .from(resource as TableNames)
      .select("*")
      .in("id", ids);

    if (error) {
      throw error;
    }

    return {
      data: (data || []) as unknown as TData[],
    };
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    variables,
  }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
    const { data, error } = await supabaseClient
      .from(resource as TableNames)
      .insert(variables as Tables[TableNames]["Insert"])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data: data as unknown as TData,
    };
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    id,
    variables,
  }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
    const { data, error } = await supabaseClient
      .from(resource as TableNames)
      .update(variables as Tables[TableNames]["Update"])
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data: data as unknown as TData,
    };
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: GetOneParams): Promise<GetOneResponse<TData>> => {
    const { data, error } = await supabaseClient
      .from(resource as TableNames)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return {
      data: data as unknown as TData,
    };
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: DeleteOneParams): Promise<DeleteOneResponse<TData>> => {
    const { data, error } = await supabaseClient
      .from(resource as TableNames)
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data: data as unknown as TData,
    };
  },

  getApiUrl: () => {
    throw Error("Not implemented");
  },

  custom: async () => {
    throw Error("Not implemented");
  },
}); 

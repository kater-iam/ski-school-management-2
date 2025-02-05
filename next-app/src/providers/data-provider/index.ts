"use client";

import { liveProvider as liveProviderSupabase } from "@refinedev/supabase";
import { supabaseBrowserClient } from "@utils/supabase/client";
import { customDataProvider } from "../custom-data-provider";

export const dataProvider = customDataProvider;
export const liveProvider = liveProviderSupabase(supabaseBrowserClient);

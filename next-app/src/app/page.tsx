"use client";

import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/layout";
import { Login } from "@/pages/login";

export default function Home() {
  return (
    <Authenticated 
      key="home"
      fallback={<Login />}
      v3LegacyAuthProviderCompatible
    >
      <Layout>
        <div className="py-4">
          <h2 className="text-2xl font-bold">ダッシュボード</h2>
          <p className="text-sm text-muted-foreground">
            スキースクール管理システムへようこそ
          </p>
        </div>
      </Layout>
    </Authenticated>
  );
}

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider, liveProvider } from "@providers/data-provider";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Refine",
  description: "Generated by create refine app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    (<html lang="ja">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProviderClient}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              options={{                
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "z4Qi4d-t7j7v8-dia0WO",
                liveMode: "auto",
              }}
            >
              {children}
              <RefineKbar />
            </Refine>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>)
  );
}

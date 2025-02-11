import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider, liveProvider } from "@providers/data-provider";
import "@styles/globals.css";
import { GalleryVerticalEnd } from "lucide-react";
import { i18nProvider } from "@providers/i18n-provider";

export const metadata: Metadata = {
  title: "Katerシステム",  
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
              i18nProvider={i18nProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "z4Qi4d-t7j7v8-dia0WO",
                liveMode: "auto",
                title: {
                  icon: <GalleryVerticalEnd />,
                  text: "スキーレッスン予約システム"
                }
              }}
              resources={[
                {
                  name: "lessons",
                  list: "/lessons",
                  create: "/lessons/create",
                  edit: "/lessons/edit/:id",
                  show: "/lessons/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                // {
                //   name: "lesson_schedules",
                //   list: "/lesson-schedules",
                //   create: "/lesson-schedules/create",
                //   edit: "/lesson-schedules/edit/:id",
                //   show: "/lesson-schedules/show/:id",
                //   meta: {
                //     canDelete: true,
                //     label: "レッスン予定"
                //   },
                // },
                {
                  name: "reservations",
                  list: "/reservations",
                  create: "/reservations/create",
                  edit: "/reservations/edit/:id",
                  show: "/reservations/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                // {
                //   name: "profiles",
                //   list: "/profiles",
                //   create: "/profiles/create",
                //   edit: "/profiles/edit/:id",
                //   show: "/profiles/show/:id",
                //   meta: {
                //     canDelete: true,
                //   },
                // },
                // {
                //   name: "user_levels",
                //   list: "/user-levels",
                //   create: "/user-levels/create",
                //   edit: "/user-levels/edit/:id",
                //   show: "/user-levels/show/:id",
                //   meta: {
                //     canDelete: true,
                //   },
                // },
              ]}
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

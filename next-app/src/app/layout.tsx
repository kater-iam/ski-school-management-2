import { DevtoolsProvider } from "@providers/devtools";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";

import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";
import "@styles/global.css";

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
    (<html lang="en">
      <body>
        <Suspense>
          <GitHubBanner />
          <RefineKbarProvider>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                authProvider={authProviderClient}
                dataProvider={dataProvider}
                resources={[{
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "instructor_schedules",
                  list: "/instructor_schedules",
                  create: "/instructor_schedules/create",
                  edit: "/instructor_schedules/edit/:id",
                  show: "/instructor_schedules/show/:id"
                }, {
                  name: "lessons",
                  list: "/lessons",
                  create: "/lessons/create",
                  edit: "/lessons/edit/:id",
                  show: "/lessons/show/:id"
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "C7l4P1-lZvmLH-Cjv7j9",
                }}
              >
                {children}
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>)
  );
}

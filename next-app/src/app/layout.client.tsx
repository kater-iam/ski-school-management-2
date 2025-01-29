"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { authProvider, dataProvider } from "@/providers";
import { ColorModeContextProvider } from "@/contexts/color-mode";
import React from "react";
import "@styles/globals.css";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={useNotificationProvider}
          authProvider={authProvider}
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
            {
              name: "lesson_schedules",
              list: "/lesson-schedules",
              create: "/lesson-schedules/create",
              edit: "/lesson-schedules/edit/:id",
              show: "/lesson-schedules/show/:id",
              meta: {
                canDelete: true,
              },
            },
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
            {
              name: "profiles",
              list: "/profiles",
              create: "/profiles/create",
              edit: "/profiles/edit/:id",
              show: "/profiles/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "user_levels",
              list: "/user-levels",
              create: "/user-levels/create",
              edit: "/user-levels/edit/:id",
              show: "/user-levels/show/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {children}
        </Refine>
        <RefineKbar />
      </ColorModeContextProvider>
    </RefineKbarProvider>
  );
}

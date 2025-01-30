"use client"

import * as React from "react"
import {
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    List,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useResource } from "@refinedev/core"
import { useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { resources } = useResource();
    const [data, setData] = useState({
        header: {
            title: "Refine Supabase Template",
            description: "v1.0.0",
        },
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: resources?.map((resource) => ({
            title: resource.meta?.label || resource.name,
            url: typeof resource.list === 'string' ? resource.list : `/${resource.name}`,
            icon: List,
            items: [
                {
                    title: "一覧",
                    url: typeof resource.list === 'string' ? resource.list : `/${resource.name}`,
                },
                ...(resource.canCreate ? [{
                    title: "新規作成",
                    url: typeof resource.create === 'string' ? resource.create : `/${resource.name}/create`,
                }] : []),
            ],
        })) || [],
        projects: [
            {
                name: "Design Engineering",
                url: "#",
                icon: Frame,
            },
            {
                name: "Sales & Marketing",
                url: "#",
                icon: PieChart,
            },
            {
                name: "Travel",
                url: "#",
                icon: Map,
            },
        ],
    });


    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">{data.header.title}</span>
                                    <span className="">{data.header.description}</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

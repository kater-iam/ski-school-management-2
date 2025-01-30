"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
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

import { useResource } from "@refinedev/core";
import { useEffect } from "react"
import { useState } from "react"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const data__ = {
        header: {
            title: "Refine Supabase Template",
            description: "v1.0.0",
        },
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },    
        navMain: [
            {
                title: "レッスン",
                url: "/lessons",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: "リスト",
                        url: "/lessons/",
                    },
                    {
                        title: "新規作成",
                        url: "/lessons/create",
                    },
                ],
            },
            
            {
                title: "Models",
                url: "#",
                icon: Bot,
                items: [
                    {
                        title: "Genesis",
                        url: "#",
                    },
                    {
                        title: "Explorer",
                        url: "#",
                    },
                    {
                        title: "Quantum",
                        url: "#",
                    },
                ],
            },
            {
                title: "Documentation",
                url: "#",
                icon: BookOpen,
                items: [
                    {
                        title: "Introduction",
                        url: "#",
                    },
                    {
                        title: "Get Started",
                        url: "#",
                    },
                    {
                        title: "Tutorials",
                        url: "#",
                    },
                    {
                        title: "Changelog",
                        url: "#",
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "Team",
                        url: "#",
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Limits",
                        url: "#",
                    },
                ],
            },
        ],
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
    }



    const { resources } = useResource();

    const [data, setData] = useState<unknown>();

    useEffect(() => {

        console.log(resources)
        if ( resources ) {
            const data = {
                ...data__,
                navMain: resources.map(resource => ({
                    title: resource.name,
                    url: `/${resource.route}`,
                    icon: resource.icon || Frame,
                    items: [
                        {
                            title: "一覧",
                            url: resource.list,
                        },
                        {
                            title: "新規作成",
                            url: resource.create,
                        },
                    ],
                }))
            }
            setData(data);
        }
    }, [resources]);

    useEffect(() => {
        console.log(data)
    }, [data]);
    

    if ( !data ) return null;
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

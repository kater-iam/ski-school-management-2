"use client"

import * as React from "react"
import {
    GalleryVerticalEnd,
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
import { useGetIdentity, useRefineContext, useResource, useTranslate } from "@refinedev/core"
import { useEffect, useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { resources } = useResource();
    const refineContext = useRefineContext()
    const translate = useTranslate()
    const { data: user } = useGetIdentity<{
        id: string;
        email: string;
    }>();


    const [data, setData] = useState({
        header: {
            title: refineContext.options.title.text as string,
            description: "v1.0.0",
        },
        user: {
            name: '',
            email: '',
            avatar: "",
        },
        navMain: resources?.map((resource) => ({
            title: translate(`resources.${resource.name}.name`),
            url: typeof resource.list === 'string' ? resource.list : `/${resource.name}`,
            icon: List,
            items: [
                {
                    title: translate(`resources.${resource.name}.titles.list`),
                    url: typeof resource.list === 'string' ? resource.list : `/${resource.name}`,
                },
                ...(resource.canCreate ? [{
                    title: translate(`resources.${resource.name}.titles.create`),
                    url: typeof resource.create === 'string' ? resource.create : `/${resource.name}/create`,
                }] : []),
            ],
        })) || [],
    });

    useEffect(() => {
        if (!user) return
        setData({
            ...data,
            user: {
                name: user!.email.split('@')[0],
                email: user!.email,
                avatar: "",
            },
        })
    }, [user])


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

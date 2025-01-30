import { SidebarTrigger } from "@components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@components/ui/breadcrumb"
import { Separator } from "@radix-ui/react-separator"
import React from "react"

export interface AuthHeaderProps {
    title: string
    path: string
}

interface Props {
    data: AuthHeaderProps[]
}

export const AuthHeader = ({ data }: Props) => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="shrink-0 bg-border w-[1px] mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {data.map((item, index) => (
                            <React.Fragment key={`breadcrumb-${index}`}>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={item.path}>
                                        {item.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < data.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

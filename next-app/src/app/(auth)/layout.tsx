import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const isAuthenticated = await authProviderServer.check();

    // テンプレートを確認するために一旦コメントアウト
    // if (!isAuthenticated.authenticated) {
    //     if (isAuthenticated.redirectTo) {
    //         redirect(isAuthenticated.redirectTo);
    //     }    
    // return <>{children}</>;
    // }

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout

"use client";

import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <h1 className="text-2xl font-bold">Refine Supabase Template</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold sm:text-6xl">404</h2>
          <h3 className="text-lg font-medium">ページが見つかりません</h3>
          <p className="text-muted-foreground">
            お探しのページは削除されたか、URLが間違っている可能性があります。
          </p>
        </div>

        <Link href="/">
          <Button size="lg">
            トップページに戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}

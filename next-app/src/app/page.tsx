'use client'

import { Button } from "@/components/ui/button";
import { useRefineContext, useTranslate } from "@refinedev/core";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function IndexPage() {  
  const refineContext = useRefineContext()
  
  return (
    <section className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 600"
          className="min-h-full min-w-full"
        >
          <defs>
            <pattern
              id="grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="1"
                strokeOpacity={0.5}
              />
            </pattern>
          </defs>          
        </svg>
      </div>

      <div className="relative flex min-h-svh w-full flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <h1 className="text-2xl font-bold">{refineContext.options.title.text}</h1>
          </div>
          
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
              シンプルで使いやすい管理画面テンプレート
            </h2>
            <p className="text-muted-foreground">
              RefineとSupabaseを使用した、モダンで拡張性の高い管理画面テンプレートです。
              認証、データ管理、リアルタイム更新などの機能を備えています。
            </p>
            <div className="flex justify-center">
              <Link href="/login">
                <Button size="lg" className="min-w-32">
                  使ってみる
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8">
            <p className="text-sm text-muted-foreground">主な機能</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[
                "認証機能",
                "データ管理",
                "リアルタイム更新",
                "ダークモード",
                "レスポンシブ",
                "TypeScript",
                "SEO対応",
                "アクセス制御"
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center justify-center rounded-lg border bg-card p-4 text-sm"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

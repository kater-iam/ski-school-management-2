'use client'

import { Button } from "@components/ui/button"
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { GalleryVerticalEnd } from "lucide-react"
import { useLogin, useRefineContext } from "@refinedev/core"
import { useForm } from "react-hook-form"
import { useState } from "react"

type LoginFormData = {
  email: string;
  password: string;
}

export function Page() {
  const { mutate: login } = useLogin();
  const refineContext = useRefineContext()
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    login(data, {
      onError: (error) => {
        setError(error?.message ?? "ログインに失敗しました");
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {refineContext.options.title.text}
        </a>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">ログイン</CardTitle>
              <CardDescription>
                メールアドレスとパスワードでログイン
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email", {
                          required: "メールアドレスを入力してください",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "有効なメールアドレスを入力してください"
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">パスワード</Label>
                        <a
                          href="/forgot-password"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          パスワードをお忘れの方
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: "パスワードを入力してください",
                          minLength: {
                            value: 8,
                            message: "パスワードは8文字以上で入力してください"
                          }
                        })}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                      )}
                    </div>
                    {error && (
                      <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                    <Button type="submit" className="w-full">
                      ログイン
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

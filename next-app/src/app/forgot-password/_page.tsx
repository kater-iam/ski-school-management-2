'use client'

import { Button } from "@components/ui/button"
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { GalleryVerticalEnd } from "lucide-react"
import { useForgotPassword, useRefineContext } from "@refinedev/core"
import { useForm } from "react-hook-form"
import { useState } from "react"

type ForgotPasswordFormData = {
  email: string;
}

export function Page() {
  const { mutate: forgotPassword } = useForgotPassword();
  const refineContext = useRefineContext()
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = (data: ForgotPasswordFormData) => {
    setError(null);
    setSuccess(null);
    forgotPassword(data, {
      onSuccess: () => {
        setSuccess("パスワードリセットのメールを送信しました。メールをご確認ください。");
      },
      onError: (error) => {
        setError(error?.message ?? "パスワードリセットに失敗しました");
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
              <CardTitle className="text-xl">パスワードをお忘れの方</CardTitle>
              <CardDescription>
                登録済みのメールアドレスを入力してください
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
                    {error && (
                      <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                    {success && (
                      <p className="text-sm text-green-600 text-center">{success}</p>
                    )}
                    <Button type="submit" className="w-full">
                      パスワードリセット
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    <a href="/login" className="underline underline-offset-4">
                      ログインページに戻る
                    </a>
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
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@lib/utils";
import { CalendarIcon } from "lucide-react";
import { CheckIcon, XIcon } from "lucide-react";

export function Page() {
  return (
    <>
      <div className="py-4">
        <h2 className="text-2xl font-bold">詳細表示</h2>
        <p className="text-sm text-muted-foreground">
          ユーザー情報の詳細表示画面です。
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4 bg-border h-px" />
      <div className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
          <div className="text-sm font-medium">ユーザー名</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2">
            shadcn
          </div>
          <p className="text-sm text-muted-foreground">
            これはあなたの公開表示名です。
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="text-sm font-medium">メールアドレス</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2">
            example@example.com
          </div>
          <p className="text-sm text-muted-foreground">
            認証済みメールアドレスです。
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="text-sm font-medium">パスワード</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2">
            ••••••••
          </div>
          <p className="text-sm text-muted-foreground">
            セキュリティのため表示されません。
          </p>
        </div>

        {/* Checkbox Settings */}
        <div className="space-y-4">
          <div className="text-sm font-medium">通知設定</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm">メール通知を受け取る</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            有効になっている通知設定です。
          </p>
        </div>

        {/* Language */}
        <div className="space-y-4">
          <div className="text-sm font-medium">表示言語</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2">
            日本語
          </div>
          <p className="text-sm text-muted-foreground">
            現在選択されている表示言語です。
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="text-sm font-medium">自己紹介</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2 min-h-[100px]">
            パソコンを持っています。
          </div>
          <p className="text-sm text-muted-foreground">
            プロフィールの自己紹介文です。
          </p>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <div className="text-sm font-medium">日付</div>
          <div className="rounded-md border bg-muted/50 px-4 py-2">
            2024年3月21日
          </div>
          <p className="text-sm text-muted-foreground">
            登録日時です。
          </p>
        </div>
      </div>
    </>
  );
}
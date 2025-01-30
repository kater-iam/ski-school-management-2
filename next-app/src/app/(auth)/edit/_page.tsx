import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Page() {
  
  return (
    <>
      <div className="py-4">
        <h2 className="text-2xl font-bold">編集テンプレート</h2>
        <p className="text-sm text-muted-foreground">
          これは編集テンプレートのサンプルです。これを元に入力フィールドを変更してください。
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4 bg-border h-px" />
      <div className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">ユーザー名</Label>
          <Input id="username" defaultValue="shadcn" />
          <p className="text-sm text-muted-foreground">
            これはあなたの公開表示名です。本名またはニックネームを使用できます。変更は30日に1回のみ可能です。
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="表示する認証済みメールアドレスを選択" />
            </SelectTrigger>
            <SelectContent>
              {/* Add email options here */}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            認証済みメールアドレスはメール設定で管理できます。
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder="パスワードを入力"
          />
          <p className="text-sm text-muted-foreground">
            8文字以上で、大文字・小文字・数字を含める必要があります。
          </p>
        </div>

        {/* Checkbox */}
        <div className="space-y-4">
          <Label>通知設定</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notify" />
              <label
                htmlFor="email-notify"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                メール通知を受け取る
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <label
                htmlFor="marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                マーケティングメールを受け取る
              </label>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            通知設定はいつでも変更できます。
          </p>
        </div>

        {/* Radio */}
        <div className="space-y-4">
          <Label>表示言語</Label>
          <RadioGroup defaultValue="jp" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jp" id="jp" />
              <label
                htmlFor="jp"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                日本語
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="en" />
              <label
                htmlFor="en"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                English
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zh" id="zh" />
              <label
                htmlFor="zh"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                中文
              </label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            選択した言語でUIが表示されます。
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">自己紹介</Label>
          <Textarea
            id="bio"
            defaultValue="パソコンを持っています。"
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            @mentionを使用して他のユーザーや組織にリンクを付けることができます。
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <Label>日付</Label>
          <div className="flex justify-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !new Date() && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {"日付を選択"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  // onSelect={() => {}}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground">
            日付を選択してください。
          </p>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-start">
          <Button type="submit" size="lg">
            保存
          </Button>
        </div>
      </div>
    </>
  );
}
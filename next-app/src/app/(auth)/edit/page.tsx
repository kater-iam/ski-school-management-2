import { Metadata } from "next";
import { Page } from "./_page";
import { AuthHeader, AuthHeaderProps } from "../_components/auth-header";

export const metadata: Metadata = {
  title: "詳細 テンプレート",
};

const DetailPage = () => {

  const breadcrumbData: AuthHeaderProps[] = [
    { title: "Refine Supabase Template", path: "/" },
    { title: "編集テンプレート", path: "/edit" },
  ]

  return (
    <>
      <AuthHeader data={breadcrumbData} />
      <div className="w-full p-8">
        <Page />
      </div>
    </>
  );
};

export default DetailPage;

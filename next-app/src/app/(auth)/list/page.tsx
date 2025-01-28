import { Metadata } from "next";
import { Page } from "./_page";
import { AuthHeader, AuthHeaderProps } from "../_components/auth-header";

export const metadata: Metadata = {
  title: "リスト テンプレート",
};

const ListPage = () => {

  const breadcrumbData: AuthHeaderProps[] = [
    { title: "Refine Supabase Template", path: "/" },
    { title: "リストテンプレート", path: "/detail" },
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

export default ListPage;

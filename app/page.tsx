"use server";
import { PostReduced } from "@/components/post";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Posts } from "@/utils/supabase/post";
import { createClient } from "@/utils/supabase/server";

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";


export default async function Index() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .returns<Posts>();

  if (error || data === undefined) return <p>Error ao capturar contéudo</p>;

  return (
    <>
      <Header />
      <main className="container">
        {data.map((post) => {
          return <PostReduced post={post} />;
        })}
      </main>

      <Footer>
        <ThemeSwitcher />
      </Footer>
    </>
  );
}

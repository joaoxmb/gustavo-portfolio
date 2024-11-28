"use server";
import { PostReduced, PostViewers } from "@/components/post";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Section from "@/components/ui/section";
import { Posts } from "@/utils/supabase/post";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

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

"use server";

import { Post, Posts } from "@/utils/supabase/post";
import { createClient } from "@/utils/supabase/server";
import EditorController from "./editor-controller";

interface EditorProps {
  id: Post["id"]
}

const Editor = async ({ id }: EditorProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .returns<Posts>();

  if (error || data === undefined) return "nada para editar";

  return <EditorController post={data[0]} />;
};

export default Editor;

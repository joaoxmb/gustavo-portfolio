"use client";
import { Post } from "@/utils/supabase/post";
import TiptapEditor, { TiptapEditorProps } from "./editor-tiptap";
import { createClient } from "@/utils/supabase/client";

interface EditorControllerProps {
  post: Post;
}

let countdown: NodeJS.Timeout;

const EditorController = ({ post: { id, content } }: EditorControllerProps) => {
  const supabase = createClient();

  const handlerUpdate: TiptapEditorProps["onUpdate"] = async ({ editor }) => {
    const content = JSON.stringify(editor.getJSON());
    const { data, error } = await supabase
      .from("posts")
      .update({ content })
      .eq("id", id);

    if (error) console.error(error);

    console.log("Atualizado no banco!");
  };

  return (
    <TiptapEditor
      content={JSON.parse(content || "[]")}
      onUpdate={(props) => {
        clearTimeout(countdown);
        countdown = setTimeout(() => {
          handlerUpdate(props);
        }, 3000);
      }}
    />
  );
};

export default EditorController;

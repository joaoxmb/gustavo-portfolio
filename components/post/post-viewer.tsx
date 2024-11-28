import { Content } from "@tiptap/react";
import { Post } from "@/utils/supabase/post";
import TiptapViewer from "./post-tiptap";

interface PostViewersProps {
  post: Post;
}

const PostViewers = ({ post }: PostViewersProps) => {
  const { content, title } = post;
  
  return (
    <>
      <h2>{title}</h2>
      <TiptapViewer content={JSON.parse(content || "[]")} />
    </>
  );
};

export default PostViewers;
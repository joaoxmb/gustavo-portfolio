"use server";

import Editor from "@/components/editor";

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const { id } = await params;

  return <Editor id={id} />;
};

export default EditorPage;

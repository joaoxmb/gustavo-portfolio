"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageTools from "@/tiptap/image-tools";


const TiptapEditor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      ImageTools,
    ],
    content: "teste",
    immediatelyRender: false,
  })

  return (
    <>
      <EditorContent 
        className="prose lg:prose-xl md:prose-base sm:prose-sm prose-p:m-0 *:outline-none"
        editor={editor} 
      />
    </>
  )
}

export default TiptapEditor;
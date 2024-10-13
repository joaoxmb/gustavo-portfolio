"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: "teste",
    immediatelyRender: false
  })

  return (
    <>
      <EditorContent 
        className="prose lg:prose-xl md:prose-base sm:prose-sm"
        editor={editor} 
      />
    </>
  )
}

export default TiptapEditor;
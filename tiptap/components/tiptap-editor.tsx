"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: "teste"
  })

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}

export default TiptapEditor;
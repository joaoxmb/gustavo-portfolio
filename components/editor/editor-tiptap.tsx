"use client";

import { DefaultExtensions } from "@/tiptap/utils";
import Youtube from "@tiptap/extension-youtube";
import { Content, EditorContent, EditorEvents, useEditor } from "@tiptap/react";

export interface TiptapEditorProps {
  content: Content,
  onUpdate: (props: EditorEvents["update"]) => void
}

const TiptapEditor = ({ content, onUpdate }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      ...DefaultExtensions,
      Youtube.configure({
        autoplay: false,
        ccLoadPolicy: false,
        modestBranding: false,
        controls: true,
        nocookie: false,
        ivLoadPolicy: 0,
        enableIFrameApi: true
      }),
    ],
    editable: true,
    content: content,
    immediatelyRender: false,
    onUpdate: (props) => onUpdate && onUpdate(props) 
  })

  return (
    <>
      <EditorContent 
        className="prose dark:prose-invert lg:prose-xl md:prose-base sm:prose-sm prose-p:m-0 container *:outline-none tiptap-youtube-ex"
        editor={editor} 
      />
    </>
  )
}

export default TiptapEditor;
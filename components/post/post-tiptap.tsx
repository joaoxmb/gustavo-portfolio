"use client";

import { DefaultExtensions } from "@/tiptap/utils";
import { YoutubeViewer } from "@/tiptap/youtube-viewer";
import { Content, EditorContent, useEditor } from "@tiptap/react";

interface TiptapViewerProps {
  content?: Content
}

const TiptapViewer = ({ content }: TiptapViewerProps) => {

  const editor = useEditor({
    extensions: [
      ...DefaultExtensions,
      YoutubeViewer
    ],
    content: content,
    immediatelyRender: false,
    editable: false
  })

  return (
    <>
      <EditorContent 
        className="prose prose-p:m-0 dark:prose-invert max-w-full *:w-full *:outline-none"
        editor={editor} 
      />
    </>
  )
}

export default TiptapViewer;
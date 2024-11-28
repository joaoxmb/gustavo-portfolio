import { JSONContent } from "@tiptap/react";

export interface Post {
  id: string,
  title: string,
  content: string,
  creation_date: Date,
  posted: boolean,
}

export type Posts = Post[];

export const parseContent = (content: Post["content"]) => {
  return JSON.parse(content || "[]") as JSONContent
}
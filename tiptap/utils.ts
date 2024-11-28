"use client";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageTools from "@/tiptap/image-tools";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const storage = "images";
const imageHost =
  "https://vhcrsohenlhrvpwlteft.supabase.co/storage/v1/object/public";

type uploadImage = (file: File) => Promise<string>;

export const uploadImage: uploadImage = async (file) => {
  const uuidName = `posts/${uuidv4()}`;

  const { error } = await supabase.storage.from(storage).upload(uuidName, file);

  if (error) throw new Error(error.message);

  const { data } = await supabase.storage.from(storage).getPublicUrl(uuidName);

  return data.publicUrl;
};

type deleteImage = (path: string) => Promise<any>;

export const deleteImage: deleteImage = (path) => {
  const cleanPath = path.replace(`${imageHost}/${storage}/`, "");
  return supabase.storage.from(storage).remove([cleanPath]);
};

export const DefaultExtensions = [StarterKit, Image, ImageTools];

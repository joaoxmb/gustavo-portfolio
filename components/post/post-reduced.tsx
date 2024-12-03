"use client";
import Image from "next/image";
import Link from "next/link";

import { parseContent, Post } from "@/utils/supabase/post";
import { JSONContent } from "@tiptap/react";
import Video from "../ui/video";
import { ReactElement, useRef } from "react";
import {
  InView,
  PlainChildrenProps,
  useInView,
} from "react-intersection-observer";

const randomGenerator = (porcentage?: number) =>
  Math.round(Math.random() * (porcentage || 100));

const randomChoice = (porcentage?: number) =>
  randomGenerator() > (porcentage || 50);

const filterMidia = (content: JSONContent[]) => {
  return content.filter((el) => el.type === "image" || el.type === "youtube");
};
const calcLayout = (content: JSONContent[]) => {
  return content.map((midia, index, array) => {
    const amountItemRemaining = array.length - index;

    if (midia.layout) return midia;

    if (
      midia.type === "youtube" ||
      amountItemRemaining < 2 ||
      randomChoice(80)
    ) {
      return { ...midia, layout: "col-span-2" };
    }

    array[index].layout = "col-span-1";
    array[index + 1].layout = "col-span-1";

    return midia;
  });
};

const Midia: (props: JSONContent) => React.ReactNode = ({ type, attrs }) => {
  return <></>;
};

const PostItem = ({ layout, type, attrs }: JSONContent) => {
  const ref = useRef<HTMLDivElement>(null);

  const Component = () => {
    switch (type) {
      case "image":
        return (
          <Image
            src={attrs?.src}
            alt=""
            width={1024}
            height={1024}
            className="w-full h-full object-cover object-center"
          />
        );
      case "youtube":
        return <Video src={attrs?.src} className="w-full h-full" />;
    }
  };
  const handlerChange = (inView: boolean) => {
    if (!ref.current) return;

    ref.current.style.opacity = inView ? "100%" : "0%";
  };

  return (
    <InView
      as="li"
      onChange={(inView) => handlerChange(inView)}
      className={`w-full p-0 ${layout}`}
    >
      <div ref={ref} className="transition-opacity duration-1000 ease-in flex items-stretch h-full w-full">
        <Component />
      </div>
    </InView>
  );
};

interface PostReducedProps {
  post: Post;
}

const PostReduced = ({ post: { content, title, id } }: PostReducedProps) => {
  const { content: body } = parseContent(content);

  if (!body) return;

  const filtredMidia = filterMidia(body);
  const midiaWithLayout = calcLayout(filtredMidia);

  return (
    <div className="relative">
      <header className="sticky top-20 m-4 p-4 py-6 z-10">
        <Link href={`/post/${id}`}>
          <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
        </Link>
      </header>

      <ul className="grid grid-cols-2 grid-rows-2">
        {midiaWithLayout.map((props) => {
          return <PostItem {...props} />;
        })}
      </ul>
    </div>
  );
};

export default PostReduced;

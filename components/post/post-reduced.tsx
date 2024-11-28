"use server";
import Image from "next/image";
import ytdl from "@distube/ytdl-core";
import { parseContent, Post } from "@/utils/supabase/post";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import Video from "../ui/video";

const randomGenerator = (porcentage?: number) =>
  Math.round(Math.random() * (porcentage || 100));

const randomChoice = (porcentage?: number) =>
  randomGenerator() > (porcentage || 50);

const parsePorcentage = (num: number) => num + "%";

const filterMidia = (content?: JSONContent[]) => {
  return content?.filter((el) => el.type === "image" || el.type === "youtube");
};
const calcLayout = (content?: JSONContent[]) => {
  return content?.map((midia, index, array) => {
    const colunsLimit = 2;
    const amountItemRemaining = array.length - index;

    if (midia.layout) return midia;

    if (
      midia.type === "youtube" ||
      amountItemRemaining < 2 ||
      randomChoice(80)
    ) {
      return { ...midia, layout: "100%" };
    }

    const randomAmountRemaining = randomGenerator(amountItemRemaining);
    const amountWithLimit = Math.max(
      Math.min(Math.round(randomAmountRemaining), colunsLimit),
      2
    );
    const equalParts = 100 / amountWithLimit;
    const parts = Array.from({ length: amountWithLimit }).map(
      (_) => equalParts
    );

    if (randomChoice()) {
      parts.map((value, splitIndex) => {
        array[index + splitIndex].layout = parsePorcentage(value);
      });

      return array[index];
    }

    parts
      .reduce<number[]>((previus, current, index, array) => {
        if (index == 0) return array;

        const random = Math.max(
          Math.round(randomGenerator(equalParts) / randomAmountRemaining * 1.5),
          0
        );

        if (random % 2 > 0) {
          // Impar
          previus[index - 1] += random;
          previus[index] -= random;
        } else {
          // Par
          previus[index] += random;
          previus[index - 1] -= random;
        }

        return previus;
      }, [])
      .map((value, splitIndex) => {
        array[index + splitIndex].layout = parsePorcentage(value);
      });

    return array[index];
  });
};

interface PostReducedProps {
  post: Post;
}

const PostReduced = async ({
  post: { content, title, id },
}: PostReducedProps) => {
  const { content: body } = parseContent(content);
  const filtredMidia = filterMidia(body);
  const midiaWithLayout = calcLayout(filtredMidia);

  return (
    <div className="relative">
      <header className="sticky top-20 m-4 p-4 py-6 z-10">
        <Link href={`/post/${id}`}>
          <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
        </Link>
      </header>

      <ul className="flex flex-wrap">
        {midiaWithLayout?.map(({ type, attrs, layout }) => {
          const Midia = async () => {
            switch (type) {
              case "image":
                return (
                  <Image
                    src={attrs?.src}
                    alt=""
                    width={1024}
                    height={1024}
                    className="w-full h-full aspect-video object-cover object-center"
                  />
                );
              case "youtube":
                const { formats } = await ytdl.getInfo(attrs?.src);
                const filterFormat = formats.filter(
                  ({ mimeType, url, quality }) =>
                    mimeType?.includes("video/mp4") &&
                    url.includes("https://rr")
                );

                return (
                  <Video 
                    src={filterFormat[0].url} 
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    className="w-full h-full aspect-video object-cover"
                  />
                );
            }
          };

          return (
            <li
              className="w-full p-0"
              style={{
                width: layout,
              }}
            >
              <Midia />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostReduced;

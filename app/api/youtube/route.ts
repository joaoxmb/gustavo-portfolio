import ytdl from "@distube/ytdl-core";

export async function POST(req: Request) {
  const { src } = await req.json();

  const { formats } = await ytdl.getInfo(src);
  const filterFormat = formats.filter(
    ({ mimeType, url, quality }) =>
      mimeType?.includes("video/mp4") && url.includes("https://rr")
  );
  const getOnlyUrl = filterFormat.map(({ url }) => url);

  return Response.json({
    data: getOnlyUrl,
  });
}

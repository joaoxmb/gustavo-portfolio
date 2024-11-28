"use client";
import { useRef, VideoHTMLAttributes } from "react";
import { InView } from "react-intersection-observer";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";

const regex =
  /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|https?:\/\/youtu\.be\/)([^"&?\/\s]{11})/;

const Video = (props: VideoHTMLAttributes<HTMLVideoElement>) => {
  const ref = useRef<any>(null);
  const match = props?.src?.match(regex);

  const handlerPlayer = (inView: boolean) => {
    if (!ref) return;

    if (inView) {
      ref?.current?.playVideo();  
      console.log("play");
    } else {
      console.log("pause");
      ref?.current?.pauseVideo();
    }
  };  

  const handlerReady: YouTubeProps['onReady'] = (event) => {
    ref.current = event.target
  }

  return match && (
    <>
      <InView onChange={(inView) => handlerPlayer(inView)} className={props.className}>

        <YouTube
          videoId={match[1]}
          onReady={handlerReady}
          opts={{
            playerVars: {
              autoplay: 1,
              cc_load_policy: 0,
              constrols: 0,
              disablekb: 1,
              enablejsapi: 1,
              fs: 0,
              iv_load_policy: 3,
              loop: 1,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
          
          iframeClassName="w-full h-full aspect-video object-cover"
        />

      </InView>
    </>
  );
};

export default Video;

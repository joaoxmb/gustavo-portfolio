"use client";
import { useRef, VideoHTMLAttributes } from "react";
import { InView } from "react-intersection-observer";

const Video = (props: VideoHTMLAttributes<HTMLVideoElement>) => {
  const ref = useRef<HTMLVideoElement>(null);

  const handlerPlayer = (inView: boolean) => {
    if (inView) {
      ref?.current?.play();
      console.log("play");
    } else {
      console.log("pause");
      ref?.current?.pause();
    }
  };

  return (
    <>
      <InView onChange={(inView) => handlerPlayer(inView)}>
        <video {...props} ref={ref}></video>
      </InView>
    </>
  );
};

export default Video;

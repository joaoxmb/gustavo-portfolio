import {
  Node,
  NodeViewRendererProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useEffect, useState } from "react";

const Video = (props: NodeViewRendererProps) => {
  const [ source, setSource ] = useState(null);

  useEffect(() => {
    const getSource = async () => {
      const payload = await fetch("http://localhost:3000/api/youtube", {
        method: "POST",
        body: JSON.stringify({
          src: props.node.attrs.src
        })
      })
      const { data } = await payload.json();

      setSource(data[0]);
    }

    !source && getSource();
  }, [])

  return source && (
    <NodeViewWrapper>
      <video
        src={source}
        autoPlay={true}
        controls={true}
        muted={true}
        className="w-full h-full aspect-video object-cover"
      ></video>
    </NodeViewWrapper>
  );
}

export const YoutubeViewer = Node.create({
  name: "youtube",

  addAttributes() {
    return {
      src: null
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video] iframe',
      },
    ]
  },
  
  renderHTML() {
    return ['youtube-custom-player']
  },

  addNodeView() {
    return ReactNodeViewRenderer(Video);
  },
});

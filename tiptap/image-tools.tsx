import { Schema } from "@tiptap/pm/model";
import { Extension } from "@tiptap/react";
import {
  defaultSettings,
  imagePlugin,
  ImagePluginSettings,
  updateImageNode,
} from "prosemirror-image-plugin";

import "prosemirror-image-plugin/dist/styles/common.css";
// import "prosemirror-image-plugin/dist/styles/withResize.css";
// import "prosemirror-image-plugin/dist/styles/sideResize.css";
// import "prosemirror-image-plugin/dist/styles/withoutResize.css";

import { deleteImage, uploadImage } from "./utils";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";

const settings: ImagePluginSettings = {
  ...defaultSettings,
  uploadFile(file) {
    return uploadImage(file);
  },
  deleteSrc(src) {
    return deleteImage(src);
  },
  createOverlay(node, getPos, view) {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <>
        <Button onClick={() => console.log("deu certoo")}>teste</Button>
      </>
    );

    return container;
  },
  enableResize: false,
  hasTitle: false
};

const ImageTools = Extension.create({
  name: "image-tools",

  addOptions() {
    return [{ ...settings }];
  },

  onCreate() {
    try {
      this.editor.schema = new Schema({
        nodes: updateImageNode(this.editor.schema.spec.nodes, this.options),
        marks: this.editor.schema.spec.marks,
      });
    } catch(err) {
      console.error(err);
    }
  },

  addProseMirrorPlugins() {
    return [imagePlugin({ ...settings })];
  },
});


export default ImageTools;
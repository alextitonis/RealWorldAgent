import { VideoCapture } from "camera-capture";
import { TCameraFrame } from "../types";

const capturer = new VideoCapture({ mime: "image/jpeg" });
export const initCamera = async () => {
  await capturer.initialize();
};
export const getFrame = async (): Promise<TCameraFrame> => {
  const f = await capturer.readFrame("image/jpeg");
  return {
    buffer: f.data,
    width: f.width,
    height: f.height,
  };
};

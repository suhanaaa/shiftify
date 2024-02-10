//Asynchronously loads FFmpeg and returns an instance of the FFmpeg class.

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export default async function loadFfmpeg(): Promise<FFmpeg> {
  // Create a new instance of the FFmpeg class
  const ffmpeg = new FFmpeg();

  // Define the base URL for FFmpeg core files
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";

  // Load FFmpeg core files asynchronously
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  // Return the FFmpeg instance
  return ffmpeg;
}

//converts file from one format to another

import { Action } from "@/type";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

//extract the file extension using regular expression
function getFileExtension(file_name: string) {
  // Matches the last dot and everything after it
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }

  // No file extension found
  return "";
}

//Remove file extension
function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }

  // No file extension found
  return file_name;
}

//Converts a file using FFmpeg.
export default async function convert(
  ffmpeg: FFmpeg,
  action: Action
): Promise<any> {
  // Extract relevant information from the action object
  const { file, to, file_name, file_type } = action;

  // Extract relevant information from the action object

  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + "." + to;

  // Write the input file to FFmpeg and await fetching
  ffmpeg.writeFile(input, await fetchFile(file));

  // Execute FFmpeg commands based on output format
  let ffmpeg_cmd: any = [];
  // 3gp video
  if (to === "3gp")
    ffmpeg_cmd = [
      "-i",
      input,
      "-r",
      "20",
      "-s",
      "352x288",
      "-vb",
      "400k",
      "-acodec",
      "aac",
      "-strict",
      "experimental",
      "-ac",
      "1",
      "-ar",
      "8000",
      "-ab",
      "24k",
      output,
    ];
  else ffmpeg_cmd = ["-i", input, output];

  // Execute FFmpeg command
  await ffmpeg.exec(ffmpeg_cmd);

  // Read the output file, create a Blob, and generate a URL
  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);

  // Return URL of the converted file
  return { url, output };
}

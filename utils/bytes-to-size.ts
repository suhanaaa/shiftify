//convert bytes to string that a human can read (BYtes, KB, MB, GB, TB)

//below function takes one input name bytes which is of type number and returns a string (: String)
export default function bytesToSize(bytes: number): String {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) {
    return "0 Byte";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[1]}`;
}

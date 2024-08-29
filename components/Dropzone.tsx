// "use client";

// // imports
// import { FiUploadCloud } from "react-icons/fi";
// import { LuFileSymlink } from "react-icons/lu";
// import { MdClose } from "react-icons/md";
// import ReactDropzone from "react-dropzone";
// import bytesToSize from "@/utils/bytes-to-size";
// import fileToIcon from "@/utils/file-to-icon";
// import { useState, useEffect, useRef } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import compressFileName from "@/utils/compress-file-name";
// import { Skeleton } from "@/components/ui/skeleton";
// import convertFile from "@/utils/convert";
// import { ImSpinner3 } from "react-icons/im";
// import { MdDone } from "react-icons/md";
// import { Badge } from "@/components/ui/badge";
// import { HiOutlineDownload } from "react-icons/hi";
// import { BiError } from "react-icons/bi";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Button } from "./ui/button";
// import loadFfmpeg from "@/utils/load-ffmpeg";
// import type { Action } from "@/type";
// import { FFmpeg } from "@ffmpeg/ffmpeg";

// //accepted file extension
// const extensions = {
//   image: [
//     "jpg",
//     "jpeg",
//     "png",
//     "gif",
//     "bmp",
//     "webp",
//     "ico",
//     "tif",
//     "tiff",
//     "svg",
//     "raw",
//     "tga",
//   ],
//   video: [
//     "mp4",
//     "m4v",
//     "mp4v",
//     "3gp",
//     "3g2",
//     "avi",
//     "mov",
//     "wmv",
//     "mkv",
//     "flv",
//     "ogv",
//     "webm",
//     "h264",
//     "264",
//     "hevc",
//     "265",
//   ],
//   audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
// };

// const Dropzone = () => {
//   const { toast } = useToast();
//   const [is_hover, setIsHover] = useState<boolean>(false);
//   const [actions, setActions] = useState<Action[]>([]);
//   const [is_ready, setIsReady] = useState<boolean>(false);
//   const [files, setFiles] = useState<Array<any>>([]);
//   const [is_loaded, setIsLoaded] = useState<boolean>(false);
//   const [is_converting, setIsConverting] = useState<boolean>(false);
//   const [is_done, setIsDone] = useState<boolean>(false);
//   const ffmpegRef = useRef<any>(null);
//   const [defaultValues, setDefaultValues] = useState<string>("video");
//   const [selected, setSelected] = useState<string>("...");
//   const accepted_files = {
//     "image/*": [
//       ".jpg",
//       ".jpeg",
//       ".png",
//       ".gif",
//       ".bmp",
//       ".webp",
//       ".ico",
//       ".tif",
//       ".tiff",
//       ".raw",
//       ".tga",
//     ],
//     "audio/*": [],
//     "video/*": [],
//   };

//   //reset state
//   const reset = () => {
//     setIsDone(false);
//     setActions([]);
//     setFiles([]);
//     setIsReady(false);
//     setIsConverting(false);
//   };

//   //download all the converted files
//   const downloadAll = (): void => {
//     for (let action of actions) {
//       //check if actions has no error then download
//       !action.is_error && download(action);
//     }
//   };

//   //downloads single converted file
//   const download = (action: Action) => {
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = action.url;
//     a.download = action.output;

//     document.body.appendChild(a);
//     a.click();

//     // Clean up after download
//     URL.revokeObjectURL(action.url);
//     document.body.removeChild(a);
//   };

//   //convert file
//   const convert = async (): Promise<any> => {
//     // Set is_converting property to true for all actions
//     let tmp_actions = actions.map((elt) => ({
//       ...elt,
//       is_converting: true,
//     }));
//     // Update state to reflect conversion in progress
//     setActions(tmp_actions);
//     setIsConverting(true);

//     // Iterate through each action and convert the file
//     for (let action of tmp_actions) {
//       try {
//         // Convert the file using convertFile function
//         const { url, output } = await convertFile(ffmpegRef.current, action);

//         // Update action with conversion details if successful
//         tmp_actions = tmp_actions.map((elt) =>
//           elt === action
//             ? {
//                 ...elt,
//                 is_converted: true,
//                 is_converting: false,
//                 url,
//                 output,
//               }
//             : elt
//         );
//         // Update state with converted action
//         setActions(tmp_actions);
//       } catch (err) {
//         // Handle conversion error
//         tmp_actions = tmp_actions.map((elt) =>
//           elt === action
//             ? {
//                 ...elt,
//                 is_converted: false,
//                 is_converting: false,
//                 is_error: true,
//               }
//             : elt
//         );
//         // Update state with error details
//         setActions(tmp_actions);
//       }
//     }

//     // Update state to indicate conversion is complete
//     setIsDone(true);
//     setIsConverting(false);
//   };

//   //handle file upload
//   const handleUpload = (data: Array<any>): void => {
//     // Exit hover state when files are uploaded
//     handleExitHover();

//     // Set uploaded files in state
//     setFiles(data);

//     // Initialize temporary array to store actions
//     const tmp: Action[] = [];

//     // Iterate through each uploaded file
//     data.forEach((file: any) => {
//       // Create FormData object
//       const formData = new FormData();

//       // Push action object for the file into temporary array
//       tmp.push({
//         file_name: file.name, // File name
//         file_size: file.size, // File size
//         from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2), // File extension
//         to: null, // Target conversion type (initially null)
//         file_type: file.type, // File MIME type
//         file, // Actual file object
//         is_converted: false, // Conversion status (initially false)
//         is_converting: false, // Conversion in progress status (initially false)
//         is_error: false, // Error status (initially false)
//       });
//     });

//     // Set the temporary array of actions in state
//     setActions(tmp);
//   };

//   //handle hover over dropzone
//   const handleHover = (): void => setIsHover(true);

//   //handle exit hover over dropzone
//   const handleExitHover = (): void => setIsHover(false);

//   //update Action
//   const updateAction = (file_name: String, to: String) => {
//     // Update actions state based on file name and conversion target
//     setActions(
//       actions.map((action): Action => {
//         // Check if the action corresponds to the provided file name
//         if (action.file_name === file_name) {
//           console.log("FOUND");
//           // If found, update the 'to' property with the new conversion target
//           return {
//             ...action,
//             to,
//           };
//         }
//         // If not found, return the action as it is
//         return action;
//       })
//     );
//   };

//   //check if all actions are ready
//   const checkIsReady = (): void => {
//     // Initialize a temporary variable to track the readiness status
//     let tmp_is_ready = true;

//     // Iterate through each action in the actions array
//     actions.forEach((action: Action) => {
//       // Check if the 'to' property of the action is falsy (indicating no conversion target)
//       if (!action.to) {
//         // If 'to' is falsy for any action, set the temporary readiness status to false
//         tmp_is_ready = false;
//       }
//     });

//     // Update the state variable 'isReady' with the temporary readiness status
//     setIsReady(tmp_is_ready);
//   };

//   //delete an action
//   const deleteAction = (action: Action): void => {
//     // Filter out the action to be deleted from the actions array and update the state
//     setActions(actions.filter((elt) => elt !== action));

//     // Filter out the corresponding file to be deleted from the files array and update the state
//     setFiles(files.filter((elt) => elt.name !== action.file_name));
//   };

//   //load FFmpeg
//   const load = async () => {
//     // Load FFmpeg and wait for the response
//     const ffmpeg_response: FFmpeg = await loadFfmpeg();

//     // Set the loaded FFmpeg instance to the ffmpegRef
//     ffmpegRef.current = ffmpeg_response;

//     // Update the state to indicate that FFmpeg is loaded
//     setIsLoaded(true);
//   };

//   useEffect(() => {
//     if (!actions.length) {
//       setIsDone(false);
//       setFiles([]);
//       setIsReady(false);
//       setIsConverting(false);
//     } else checkIsReady();
//   }, [actions]);
//   useEffect(() => {
//     load();
//   }, []);

//   if (actions.length) {
//     // Render the list of actions if there are actions available

//     return (
//       <div className="space-y-6">
//         {actions.map((action: Action, i: any) => (
//           <div
//             key={i}
//             className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
//           >
//             {!is_loaded && (
//               <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
//             )}
//             <div className="flex gap-4 items-center">
//               <span className="text-2xl text-orange-600">
//                 {fileToIcon(action.file_type)}
//               </span>
//               <div className="flex items-center gap-1 w-96">
//                 <span className="text-md font-medium overflow-x-hidden">
//                   {compressFileName(action.file_name)}
//                 </span>
//                 <span className="text-gray-400 text-sm">
//                   ({bytesToSize(action.file_size)})
//                 </span>
//               </div>
//             </div>

//             {action.is_error ? (
//               <Badge variant="destructive" className="flex gap-2">
//                 <span>Error Converting File</span>
//                 <BiError />
//               </Badge>
//             ) : action.is_converted ? (
//               <Badge variant="default" className="flex gap-2 bg-green-500">
//                 <span>Done</span>
//                 <MdDone />
//               </Badge>
//             ) : action.is_converting ? (
//               <Badge variant="default" className="flex gap-2">
//                 <span>Converting</span>
//                 <span className="animate-spin">
//                   <ImSpinner3 />
//                 </span>
//               </Badge>
//             ) : (
//               <div className="text-gray-400 text-md flex items-center gap-4">
//                 <span>Convert to</span>
//                 <Select
//                   onValueChange={(value) => {
//                     if (extensions.audio.includes(value)) {
//                       setDefaultValues("audio");
//                     } else if (extensions.video.includes(value)) {
//                       setDefaultValues("video");
//                     }
//                     setSelected(value);
//                     updateAction(action.file_name, value);
//                   }}
//                   value={selected}
//                 >
//                   <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
//                     <SelectValue placeholder="..." />
//                   </SelectTrigger>
//                   <SelectContent className="h-fit">
//                     {action.file_type.includes("image") && (
//                       <div className="grid grid-cols-2 gap-2 w-fit">
//                         {extensions.image.map((elt, i) => (
//                           <div key={i} className="col-span-1 text-center">
//                             <SelectItem value={elt} className="mx-auto">
//                               {elt}
//                             </SelectItem>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     {action.file_type.includes("video") && (
//                       <Tabs defaultValue={defaultValues} className="w-full">
//                         <TabsList className="w-full">
//                           <TabsTrigger value="video" className="w-full">
//                             Video
//                           </TabsTrigger>
//                           <TabsTrigger value="audio" className="w-full">
//                             Audio
//                           </TabsTrigger>
//                         </TabsList>
//                         <TabsContent value="video">
//                           <div className="grid grid-cols-3 gap-2 w-fit">
//                             {extensions.video.map((elt, i) => (
//                               <div key={i} className="col-span-1 text-center">
//                                 <SelectItem value={elt} className="mx-auto">
//                                   {elt}
//                                 </SelectItem>
//                               </div>
//                             ))}
//                           </div>
//                         </TabsContent>
//                         <TabsContent value="audio">
//                           <div className="grid grid-cols-3 gap-2 w-fit">
//                             {extensions.audio.map((elt, i) => (
//                               <div key={i} className="col-span-1 text-center">
//                                 <SelectItem value={elt} className="mx-auto">
//                                   {elt}
//                                 </SelectItem>
//                               </div>
//                             ))}
//                           </div>
//                         </TabsContent>
//                       </Tabs>
//                     )}
//                     {action.file_type.includes("audio") && (
//                       <div className="grid grid-cols-2 gap-2 w-fit">
//                         {extensions.audio.map((elt, i) => (
//                           <div key={i} className="col-span-1 text-center">
//                             <SelectItem value={elt} className="mx-auto">
//                               {elt}
//                             </SelectItem>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {action.is_converted ? (
//               <Button variant="outline" onClick={() => download(action)}>
//                 Download
//               </Button>
//             ) : (
//               <span
//                 onClick={() => deleteAction(action)}
//                 className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
//               >
//                 <MdClose />
//               </span>
//             )}
//           </div>
//         ))}
//         <div className="flex w-full justify-end">
//           {is_done ? (
//             <div className="space-y-4 w-fit">
//               <Button
//                 size="lg"
//                 className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
//                 onClick={downloadAll}
//               >
//                 {actions.length > 1 ? "Download All" : "Download"}
//                 <HiOutlineDownload />
//               </Button>
//               <Button
//                 size="lg"
//                 onClick={reset}
//                 variant="outline"
//                 className="rounded-xl"
//               >
//                 Convert Another File(s)
//               </Button>
//             </div>
//           ) : (
//             <Button
//               size="lg"
//               disabled={!is_ready || is_converting}
//               className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
//               onClick={convert}
//             >
//               {is_converting ? (
//                 <span className="animate-spin text-lg">
//                   <ImSpinner3 />
//                 </span>
//               ) : (
//                 <span>Convert Now</span>
//               )}
//             </Button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ReactDropzone
//       onDrop={handleUpload}
//       onDragEnter={handleHover}
//       onDragLeave={handleExitHover}
//       accept={accepted_files}
//       onDropRejected={() => {
//         handleExitHover();
//         toast({
//           variant: "destructive",
//           title: "Error uploading your file(s)",
//           description: "Allowed Files: Audio, Video and Images.",
//           duration: 5000,
//         });
//       }}
//       onError={() => {
//         handleExitHover();
//         toast({
//           variant: "destructive",
//           title: "Error uploading your file(s)",
//           description: "Allowed Files: Audio, Video and Images.",
//           duration: 5000,
//         });
//       }}
//     >
//       {({ getRootProps, getInputProps }) => (
//         <div
//           {...getRootProps()}
//           className=" bg-gray-50 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center"
//         >
//           <input {...getInputProps()} />
//           <div className="space-y-4 text-gray-500">
//             {is_hover ? (
//               <>
//                 <div className="justify-center flex text-6xl">
//                   <LuFileSymlink />
//                 </div>
//                 <h3 className="text-center font-medium text-2xl">
//                   Yes, right there
//                 </h3>
//               </>
//             ) : (
//               <>
//                 <div className="justify-center flex text-6xl">
//                   <FiUploadCloud />
//                 </div>
//                 <h3 className="text-center font-medium text-2xl">
//                   Click, or drop your files here
//                 </h3>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </ReactDropzone>
//   );
// };

// export default Dropzone;

"use client";

// imports
// import { FiUploadCloud } from "react-icons/fi";
// import { LuFileSymlink } from "react-icons/lu";
// import { MdClose } from "react-icons/md";
// import ReactDropzone from "react-dropzone";
import bytesToSize from "@/utils/bytes-to-size";
import fileToIcon from "@/utils/file-to-icon";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import compressFileName from "@/utils/compress-file-name";
import { Skeleton } from "@/components/ui/skeleton";
import convertFile from "@/utils/convert";
// import { ImSpinner3 } from "react-icons/im";
// import { MdDone } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
// import { HiOutlineDownload } from "react-icons/hi";
// import { BiError } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import loadFfmpeg from "@/utils/load-ffmpeg";
import type { Action } from "@/type";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import dynamic from "next/dynamic";

const ReactDropzone = dynamic(() => import("react-dropzone"), { ssr: false });
const FiUploadCloud = dynamic(
  () => import("react-icons/fi").then((mod) => mod.FiUploadCloud),
  { ssr: false }
);
const LuFileSymlink = dynamic(
  () => import("react-icons/lu").then((mod) => mod.LuFileSymlink),
  { ssr: false }
);
const MdClose = dynamic(
  () => import("react-icons/md").then((mod) => mod.MdClose),
  { ssr: false }
);
const ImSpinner3 = dynamic(
  () => import("react-icons/im").then((mod) => mod.ImSpinner3),
  { ssr: false }
);
const MdDone = dynamic(
  () => import("react-icons/md").then((mod) => mod.MdDone),
  { ssr: false }
);
const HiOutlineDownload = dynamic(
  () => import("react-icons/hi").then((mod) => mod.HiOutlineDownload),
  { ssr: false }
);
const BiError = dynamic(
  () => import("react-icons/bi").then((mod) => mod.BiError),
  { ssr: false }
);

//accepted file extension
const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

const Dropzone = () => {
  const { toast } = useToast();
  const [is_hover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const [defaultValues, setDefaultValues] = useState<string>("video");
  const [selected, setSelected] = useState<string>("...");
  const accepted_files = {
    "image/*": [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".ico",
      ".tif",
      ".tiff",
      ".raw",
      ".tga",
    ],
    "audio/*": [],
    "video/*": [],
  };

  //reset state
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  //download all the converted files
  const downloadAll = (): void => {
    for (let action of actions) {
      //check if actions has no error then download
      !action.is_error && download(action);
    }
  };

  //downloads single converted file
  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  //convert file
  const convert = async (): Promise<any> => {
    // Set is_converting property to true for all actions
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    // Update state to reflect conversion in progress
    setActions(tmp_actions);
    setIsConverting(true);

    // Iterate through each action and convert the file
    for (let action of tmp_actions) {
      try {
        // Convert the file using convertFile function
        const { url, output } = await convertFile(ffmpegRef.current, action);

        // Update action with conversion details if successful
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt
        );
        // Update state with converted action
        setActions(tmp_actions);
      } catch (err) {
        // Handle conversion error
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        // Update state with error details
        setActions(tmp_actions);
      }
    }

    // Update state to indicate conversion is complete
    setIsDone(true);
    setIsConverting(false);
  };

  //handle file upload
  const handleUpload = (data: Array<any>): void => {
    // Exit hover state when files are uploaded
    handleExitHover();

    // Set uploaded files in state
    setFiles(data);

    // Initialize temporary array to store actions
    const tmp: Action[] = [];

    // Iterate through each uploaded file
    data.forEach((file: any) => {
      // Create FormData object
      const formData = new FormData();

      // Push action object for the file into temporary array
      tmp.push({
        file_name: file.name, // File name
        file_size: file.size, // File size
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2), // File extension
        to: null, // Target conversion type (initially null)
        file_type: file.type, // File MIME type
        file, // Actual file object
        is_converted: false, // Conversion status (initially false)
        is_converting: false, // Conversion in progress status (initially false)
        is_error: false, // Error status (initially false)
      });
    });

    // Set the temporary array of actions in state
    setActions(tmp);
  };

  //handle hover over dropzone
  const handleHover = (): void => setIsHover(true);

  //handle exit hover over dropzone
  const handleExitHover = (): void => setIsHover(false);

  //update Action
  const updateAction = (file_name: String, to: String) => {
    // Update actions state based on file name and conversion target
    setActions(
      actions.map((action): Action => {
        // Check if the action corresponds to the provided file name
        if (action.file_name === file_name) {
          console.log("FOUND");
          // If found, update the 'to' property with the new conversion target
          return {
            ...action,
            to,
          };
        }
        // If not found, return the action as it is
        return action;
      })
    );
  };

  //check if all actions are ready
  const checkIsReady = (): void => {
    // Initialize a temporary variable to track the readiness status
    let tmp_is_ready = true;

    // Iterate through each action in the actions array
    actions.forEach((action: Action) => {
      // Check if the 'to' property of the action is falsy (indicating no conversion target)
      if (!action.to) {
        // If 'to' is falsy for any action, set the temporary readiness status to false
        tmp_is_ready = false;
      }
    });

    // Update the state variable 'isReady' with the temporary readiness status
    setIsReady(tmp_is_ready);
  };

  //delete an action
  const deleteAction = (action: Action): void => {
    // Filter out the action to be deleted from the actions array and update the state
    setActions(actions.filter((elt) => elt !== action));

    // Filter out the corresponding file to be deleted from the files array and update the state
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  //load FFmpeg
  const load = async () => {
    // Load FFmpeg and wait for the response
    const ffmpeg_response: FFmpeg = await loadFfmpeg();

    // Set the loaded FFmpeg instance to the ffmpegRef
    ffmpegRef.current = ffmpeg_response;

    // Update the state to indicate that FFmpeg is loaded
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);
  useEffect(() => {
    load();
  }, []);

  if (actions.length) {
    // Render the list of actions if there are actions available

    return (
      <div className="space-y-6">
        {actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!is_loaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-orange-600">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({bytesToSize(action.file_size)})
                </span>
              </div>
            </div>

            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Converting File</span>
                <BiError />
              </Badge>
            ) : action.is_converted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Done</span>
                <MdDone />
              </Badge>
            ) : action.is_converting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </Badge>
            ) : (
              <div className="text-gray-400 text-md flex items-center gap-4">
                <span>Convert to</span>
                <Select
                  onValueChange={(value) => {
                    if (extensions.audio.includes(value)) {
                      setDefaultValues("audio");
                    } else if (extensions.video.includes(value)) {
                      setDefaultValues("video");
                    }
                    setSelected(value);
                    updateAction(action.file_name, value);
                  }}
                  value={selected}
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.file_type.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes("video") && (
                      <Tabs defaultValue={defaultValues} className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.file_type.includes("audio") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.is_converted ? (
              <Button variant="outline" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {is_done ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="outline"
                className="rounded-xl"
              >
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!is_ready || is_converting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {is_converting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" bg-gray-50 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-gray-500">
            {is_hover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <FiUploadCloud />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;

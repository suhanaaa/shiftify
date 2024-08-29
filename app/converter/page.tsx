import Dropzone from "@/components/Dropzone";
import React from "react";

const page = () => {
  return (
    <div className="p-14 lg:px-80">
      <div className="absolute top-[20%] left-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-[50%] top-0 -z-10 m-auto h-[310px] w-[510px] rounded-full bg-[#b3e3ff] opacity-40 blur-[100px]"></div>

        <div className="absolute right-0 left-[50%] top-[0%] -z-10 m-auto h-[310px] w-[510px] rounded-full bg-[#8bd3fc] opacity-40 blur-[100px]"></div>
      </div>
      <Dropzone />
    </div>
  );
};

export default page;

import Dropzone from "@/components/Dropzone";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-12">
      <h1 className="font-bold text-2xl lg:text-4xl text-center mb-4">
        Unleash Your Creative Power with Shiftify!
      </h1>
      <p className="text-center mb-8 p-4 text-gray-500 md:w-3/4 lg:w-4/6">
        Shiftify offers more than just a file converter – it&#39;s your gateway
        to boundless creativity! Seamlessly transform images, audio, and videos
        with our intuitive and free online tool. Break free from limitations and
        unlock the full potential of your multimedia projects. Get started today
        and watch your creativity soar to new heights!
      </p>
      <Link href="/converter">
        <button className="bg-black transition hover:bg-[#45b8fa] text-white font-bold py-3 px-4 rounded">
          Get started
        </button>
      </Link>
      <div className="flex flex-col md:flex-row pt-8">
        <Image src={"/file.png"} alt={"a girl"} height={900} width={600} />
      </div>
      <div className="absolute left-0 right-0 top-14 -z-10 m-auto h-[310px] w-[610px] rounded-full bg-[#2eaff9] opacity-20 blur-[100px]"></div>
      {/* <button className="font-semibold text-3xl">Why choose Us?</button> */}
    </div>
  );
}

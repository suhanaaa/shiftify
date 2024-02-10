import React from "react";
import { FaImage } from "react-icons/fa6";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaStar } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="text-center mt-6 p-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white  bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Why use Shifty?</h1>
        <p className="text-gray-700">
          Shiftify is your ultimate destination for seamless multimedia
          transformation. Say goodbye to limitations and hello to boundless
          creative freedom, all at no cost!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <FaImage size={32} />
            Image Conversion
          </h3>
          <p className="text-gray-700">
            Unleash your creativity with Shiftify&#39;s image conversion tool.
            Resize, crop, rotate, or convert formats effortlessly. From JPEG to
            PNG and beyond, elevate your visual content effortlessly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <AiFillAudio size={32} />
            Audio Transformation
          </h3>
          <p className="text-gray-700">
            Turn up the volume on your audio projects with Shiftify&#39;s audio
            conversion capabilities. Convert audio files between various formats
            like MP3, WAV, or AAC. Trim, merge, and adjust bitrates to create
            your perfect soundtrack.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <FaVideo size={32} /> Video Metamorphosis
          </h3>
          <p className="text-gray-700">
            Lights, camera, action! Edit and transcode videos without limits.
            Change video formats, cut, and merge clips to create stunning video
            content for any platform or purpose.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <IoIosRocket size={32} />
            Unlimited Usage, No Strings Attached
          </h3>
          <p className="text-gray-700">
            Unlike other services, Shiftify believes in empowering your
            creativity without hidden fees or restrictions. Enjoy unlimited
            usage at no cost. Convert as many images, audio files, and videos as
            your heart desires, without spending a dime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <TbWorld size={32} /> Accessible Anywhere
          </h3>
          <p className="text-gray-700">
            Access Shiftify from any device with an internet connection. Whether
            you&#39;re on your computer, tablet, or smartphone, our platform is
            accessible anywhere, anytime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <RiGitRepositoryPrivateFill size={32} />
            Secure and Private
          </h3>
          <p className="text-gray-700">
            Rest easy knowing that your multimedia files are treated with the
            utmost care. Shiftify prioritizes your privacy and data security,
            ensuring that your files remain yours alone.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <FaLightbulb size={32} /> User-Friendly Interface
          </h3>
          <p className="text-gray-700">
            Shiftify&#39;s intuitive interface is designed for both beginners
            and experts alike, making the conversion process a breeze. No
            technical expertise required!
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <GoGraph size={32} /> Constantly Evolving
          </h3>
          <p className="text-gray-700">
            Shiftify is committed to staying ahead of the curve. Expect regular
            updates and new features to keep your multimedia experience fresh
            and exciting.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="gap-2 items-center flex text-xl font-bold mb-2">
            <FaStar size={32} />
            Free, Powerful, Shiftify
          </h3>
          <p className="text-gray-700">
            Experience the freedom to convert images, audio, and video without
            boundaries. Elevate your multimedia projects with the unlimited
            potential of Shiftify.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ModeToggle } from "./ToggleButton";
import { Button } from "./ui/button";
import { IoIosMenu } from "react-icons/io";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const Navbar = () => {
  return (
    <nav className="items-center flex justify-between px-4 py-4 shadow-lg lg:px-40">
      <Link href="/">
        <span className="font-bold tracking-wider pt-2 text-2xl">shiftify</span>
      </Link>

      <div className="hidden space-x-5 font-medium lg:block md:block">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/converter">Converter</Link>
      </div>

      <div className="hidden md:flex justify-between ">
        <ModeToggle />
        <Link href="https://github.com/suhanaaa">
          <button className="ml-2 flex gap-1 text-sm items-center px-2 py-[0.63rem] border-black font-medium text-black border-2">
            <FaGithub size={20} />
            Github
          </button>
        </Link>

        <Link href="https://www.linkedin.com/in/suhana-parveen-599b94224/">
          <button className="flex gap-1 text-sm items-center bg-black text-white px-2 py-3 font-medium">
            <FaLinkedin size={20} />
            Linkedln
          </button>
        </Link>
      </div>

      <Sheet>
        <SheetTrigger className="block md:hidden p-3">
          <span className="text-2xl">
            <IoIosMenu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="w-full space-y-3">
                <Link href="/">
                  <Button
                    variant="link"
                    className="font-semibold text-md w-full"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="link"
                    className="font-semibold text-md w-full"
                  >
                    About
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button
                    variant="link"
                    className="font-semibold text-md w-full"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;

"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";

import Image from "next/image";
import { HeaderAction } from "./header-actions";

export default function Header() {
  return (
    <div className="bg-slate-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 text-2xl">
          <Image
            style={{ filter: "grayscale(100%) brightness(1000%)" }}
            src="/next.svg"
            width={40}
            height={40}
            alt="logo"
          />
          <div> Big Brain</div>
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <HeaderAction />
        </div>
      </div>
    </div>
  );
}

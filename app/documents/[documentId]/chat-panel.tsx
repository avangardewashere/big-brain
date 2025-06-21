"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPanel() {
  return (
    <div className="w-[300px] bg-gray-900 flex flex-col gap-2 p-4">
      <div className="h-[350px] overflow-y-auto">
        <div className="p-4 bg-gray-800">Hello world</div>
      </div>

      <div className="flex gap-1">
        <form action="">
          <Input name="text" />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
}

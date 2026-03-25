"use client";

import { useUser } from "@clerk/nextjs";
import { ProfilePhoto } from "./shared/ProfilePhoto";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";
import { useState } from "react";

export const PostInput = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  const inputHandler = () => {
    setOpen(true);
  };
  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={user?.imageUrl || "/banner.png"} />
        <Input
          type="text"
          placeholder="start post..."
          className="h-12 rounded-full hover:bg-gray-100 cursor-pointer"
          onClick={inputHandler}
        />
        <PostDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

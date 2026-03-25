"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ProfilePhoto } from "./shared/ProfilePhoto";

export const Sidebar = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <div className="hidden md:block h-fit w-[20%] border border-gray-300 bg-white rounded-lg">
      <div className="flex relative flex-col items-center">
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/banner.png"}
              alt="banner"
              width={200}
              height={200}
              className="w-full h-full rounded-t"
            />
          )}
        </div>
        <div className="absolute my-1 top-10">
          <ProfilePhoto src={user ? user?.imageUrl : "/banner.png"} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className="font-bold hover:underline cursor-pointer">
              {user ? `${user?.firstName} ${user?.lastName}` : "Kush Patle"}
            </h1>
            <p className="text-xs">@{user ? `${user.username}` : "username"}</p>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-200 cursor-pointer ">
          <p>Post Impression</p>
          <p className="text-blue-500 font-bold">88</p>
        </div>
        <div className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-200 cursor-pointer ">
          <p>Post</p>
          <p className="text-blue-500 font-bold">0</p>
        </div>
      </div>
    </div>
  );
};

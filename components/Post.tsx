"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/models/post.model";
import { ProfilePhoto } from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { PostContent } from "./PostContent";
import { deleteAction } from "@/lib/serveractions";
import { SocialOptions } from "./SocialOptions";

export const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const loggedInUser = user?.id === post?.user?.userId;
  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.profilePhoto || ""} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {`${post?.user?.firstName} ${post?.user?.lastName}`}
              {loggedInUser && (
                <Badge className="ml-2" variant="secondary">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">
              @{user ? user?.username : "username"}
            </p>
            {/* <p className="text-xs text-gray-500">@username</p> */}
            <p className="text-xs text-gray-500">1hr ago</p>
          </div>
          <div>
            {loggedInUser && (
              <Button
                size={"icon"}
                className="rounded-full cursor-pointer"
                variant={"outline"}
                onClick={() => {
                  deleteAction(post._id);
                }}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </div>
      </div>
      <PostContent post={post} />
      {/* <SocialOptions/> */}
    </div>
  );
};

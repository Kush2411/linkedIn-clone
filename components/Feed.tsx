import React from "react";
import { PostInput } from "./PostInput";
import { Posts } from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

export const Feed = async() => {
  const posts=await getAllPosts();
  return (
    <div className="flex-1">
      <PostInput />
      <Posts posts={posts}/>
    </div>
  );
};

"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createPostAction = async (
  inputText: string,
  selectedFile: string,
) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName || "KK",
    lastName: user.lastName || "Patel",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getAllPosts = async () => {
  await connectDB();

  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    // console.log(posts);
    return JSON.parse(JSON.stringify(posts));
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("Usr not authenticated");
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");
  if (post?.user?.userId !== user.id) {
    throw new Error("you are not an owner of this Post.");
  }
  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfilePhoto } from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";

export function PostDialog({ open, setOpen }: { open: boolean; setOpen: any }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const formSubmitHandler = async () => {
    try {
      await createPostAction(inputText, selectedFile);
      setInputText("");
      setOpen(false);
    } catch (error) {
      console.log("error occurred", error);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => {
          setOpen(false);
        }}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-1">
            <ProfilePhoto src={user?.imageUrl || "/banner.png"} />
            <div>
              <h1>
                {user ? `${user?.firstName} ${user?.lastName}` : "Kush Patel"}
              </h1>
              <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formSubmitHandler}>
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="bg-white border-none text-lg focus-visible:ring-0"
              placeholder="Type your message here."
            />
            <div className="my-4">
              {selectedFile && (
                <Image
                  src={selectedFile}
                  alt="preview-image"
                  width={400}
                  height={400}
                />
              )}
            </div>
          </div>
          <DialogFooter className="flex items-center sm:justify-center">
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={fileChangeHandler}
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          className="gap-2"
          onClick={() => inputRef?.current?.click()}
          variant={"ghost"}
        >
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

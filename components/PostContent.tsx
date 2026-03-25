import { IPostDocument } from "@/models/post.model";
import Image from "next/image";

export const PostContent = ({ post }: { post: IPostDocument }) => {
  return (
    <div className="my-1">
      <p className="my-3 px-4">{post?.description}</p>
      {post?.imageUrl && (
        <Image
          src={post.imageUrl}
          alt="post image"
          width={800}
          height={900}
          className="object-cover"
        />
      )}
    </div>
  );
};

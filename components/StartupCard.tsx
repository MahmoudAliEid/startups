import { dateFormat } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: StartupsCardType }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startups_card_date">{dateFormat(post?._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post?.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post?.author._id}`}>
            <p className="text-16-medium  line-clamp-1">{post?.author.name}</p>
          </Link>
          <Link href={`/startup/${post?._id}`}>
            <h3 className="text-26-semibold line-clamp-2">{post?.title}</h3>
          </Link>
        </div>

        <Link href={`/user/${post?.author._id}`}>
          <Image
            src={post?.author.image}
            alt="user"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/user/${post?._id}`}>
        <p className="startup-card_des">{post?.description}</p>
        <Image
          src={post?.image}
          alt="placeholder"
          width={100}
          height={100}
          className="startup-card_img"
        />
      </Link>
      <div className="flex-between mt-3 gap-3">
        <Link href={`/?query=${post?.category.toLowerCase()}`}></Link>
        <p className="text-16-medium">{post?.category}</p>
        <Button className="startup-card_btn" asChild>
          <Link href={`startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;

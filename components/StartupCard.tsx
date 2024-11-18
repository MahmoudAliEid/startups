import { dateFormat } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity.types";

export type StartupsCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupsCardType }) => {
  const {
    _id,
    _createdAt,
    views,
    title,
    description,
    image,
    category,
    author,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startups_card_date">{dateFormat(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium  line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-2">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "/default-user.png"}
            alt="user"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/user/${_id}`}>
        <p className="startup-card_des">{description}</p>
        <Image
          src={image || "/default-image.png"}
          alt="placeholder"
          width={100}
          height={100}
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between mt-3 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;

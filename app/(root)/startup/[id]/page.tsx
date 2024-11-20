import Heading from "@/components/Heading";
import { dateFormat } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { FIND_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import markdownit from "markdown-it";
import { StartupsCardType } from "@/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const meta = {
  title: "View Details",
  description: "View details of a startup",
};

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;
  console.log(id);

  const post = (await client.fetch(FIND_BY_ID_QUERY, {
    id,
  })) as unknown as StartupsCardType;

  if (!id) {
    return notFound();
  }

  const markDownItContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="blue_container !max-h-[230px]">
        <p className="tag">{dateFormat(post?._createdAt)}</p>
        <Heading textLeft={post?.title || ""} i18nIsDynamicList={true} />
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post?.image || "/images/placeholder.png"}
          alt={post?.title || "Startup Image"}
          layout="responsive"
          width={250}
          height={200}
          className="rounded-xl w-full h-auto"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`user/${post?.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image || "/images/placeholder.png"}
                alt={post?.author?.name || "Author Image"}
                width={65}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {markDownItContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: markDownItContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No pitch details available</p>
          )}
        </div>
        <hr className="divider mt-10" />
        {/* TODO: editor selected startups */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

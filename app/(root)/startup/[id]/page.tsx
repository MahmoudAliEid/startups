import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ** Utils
import { dateFormat } from "@/lib/utils";
// ** Sanity
import { client } from "@/sanity/lib/client";
import { FIND_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";

// ** Third Party Components
import markdownit from "markdown-it";

// ** Custom Components
import { Skeleton } from "@/components/ui/skeleton";
import StartupCard, { StartupsCardType } from "@/components/StartupCard";
import Heading from "@/components/Heading";
import View from "@/components/View";

export const metadata: Metadata = {
  title: "Startup Details - Explore Innovative Businesses",
  description:
    "Discover detailed insights and key features of groundbreaking startups revolutionizing industries.",
};
const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  // make a parallel request to fetch the post
  //@ts-expect-error: this is a hack to make the types work
  const [post, { select: editorSelectedStartups }] = await Promise.all([
    client.fetch(FIND_BY_ID_QUERY, {
      id,
    }) as unknown as StartupsCardType,
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-startups" }),
  ]);

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
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <Image
            src={post?.image || "/images/placeholder.png"}
            alt={post?.title || "Startup Image"}
            width={250}
            layout="responsive"
            height={100}
            className="rounded-xl !w-full h-full object-cover"
          />
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
        {editorSelectedStartups && editorSelectedStartups.length > 0 && (
          <div className="max-w">
            <p className="editor-heading">{`Editor's Picks`}</p>
            <ul className="card_grid-sm mt-7">
              {editorSelectedStartups.map((startup: StartupsCardType) => (
                <StartupCard
                  key={startup._id}
                  post={startup}
                  href={`/${startup._id}`}
                />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

import Heading from "@/components/Heading";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupsCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUP_QUERY);

  // const posts = [
  //   {
  //     title: "How to build a startup",
  //     description: "Learn how to build a startup from scratch",
  //     _id: 1,
  //     author: {
  //       name: "John Doe",
  //       image: "https://randomuser.me/api/portraits/men/1.jpg",
  //       _id: 1,
  //     },
  //     category: "Tech",
  //     _createdAt: new Date(),
  //     views: 100,
  //     image: "https://randomuser.me/api/portraits/men/1.jpg",
  //   },
  //   {
  //     title: "How to build a startup",
  //     description: "Learn how to build a startup from scratch",
  //     _id: 2,
  //     author: {
  //       name: "Mahmoud",
  //       image: "https://randomuser.me/api/portraits/men/10.jpg",
  //       _id: 2,
  //     },
  //     category: "Business",
  //     _createdAt: new Date(),
  //     views: 190,
  //     image: "https://randomuser.me/api/portraits/men/10.jpg",
  //   },
  // ];

  return (
    <>
      <section className="blue_container">
        <Heading
          textLeft="PITCH YOUR STARTUP,"
          textRight="CONNECT WITH ENTREPRENEURS"
        />
        <p className="sub-heading !max-w-3xl">
          Submit Ideas. Vote on Pitches. and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        {query ? (
          <p className="text-30-semibold">{`You're looking for ${query}`}</p>
        ) : (
          <p className="text-30-semibold">Latest Startups</p>
        )}
        <ul className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: StartupsCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result ">No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}

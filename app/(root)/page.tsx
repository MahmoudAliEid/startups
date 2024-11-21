// ** Custom Component
import { auth } from "@/auth";
import Heading from "@/components/Heading";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupsCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// ** Queries
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  const session = await auth();

  console.log(session?.id);
  console.log(session);

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
          <p className="text-30-semibold">{`You're looking for "${query}"`}</p>
        ) : (
          <p className="text-30-semibold">Latest Startups</p>
        )}
        <ul className="card_grid mt-7">
          {posts.length > 0 ? (
            // @ts-expect-error: Type of posts is not guaranteed
            posts.map((post: StartupsCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No posts found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}

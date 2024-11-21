import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_AUTHOR } from "@/sanity/lib/queries";
import StartupCard, { StartupsCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const userStartups = await client.fetch(STARTUP_QUERY_BY_AUTHOR, { id });

  return (
    <>
      {userStartups && userStartups.length > 0 ? (
        userStartups.map((startup: StartupsCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No startups found</p>
      )}
    </>
  );
};

export default UserStartups;

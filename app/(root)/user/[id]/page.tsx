import { auth } from "@/auth";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

import { Notify } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await auth();
  if (!session) {
    Notify({
      message: "You need to be logged in to view this page",
      type: "error",
    });
    redirect("/login");
  }
  // ** fetch data from the server
  const user = await client.fetch(USER_BY_ID_QUERY, { id });

  if (!user) {
    notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black line-clamp-1 uppercase text-center">
              {user.name}
            </h3>
          </div>
          <Image
            src={user?.image || ""}
            alt={user?.name || ""}
            className="profile_image"
            width={220}
            height={220}
          />
          <p className="text-30-extrabold text-center mt-7">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-extrabold !text-black">
            {session.id === id ? "Your" : `${user.name}'s`} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;

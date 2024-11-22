import { auth } from "@/auth";
import EditForm from "@/components/EditForm";
import { StartupsCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { FIND_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Your Startup - Join Our Innovators' Platform",
  description:
    "Edit your startup for review and get featured on our platform to connect with investors and grow your business.",
};

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const id = (await params)?.id;

  try {
    const startup = (await client.fetch(FIND_BY_ID_QUERY, {
      id,
    })) as StartupsCardType;

    if (!startup) {
      redirect("/not-found");
      return null;
    }

    return (
      <>
        <section className="blue_container !min-h-[230px]">
          <h1 className="heading">Edit your Startup</h1>
        </section>
        <EditForm id={id} startup={startup} />
      </>
    );
  } catch (error) {
    console.error("Error fetching startup data:", error);
    redirect("/error");
  }
};

export default page;

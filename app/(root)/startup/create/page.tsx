import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Submit Your Startup - Join Our Innovators' Platform",
  description:
    "Submit your startup for review and get featured on our platform to connect with investors and grow your business.",
};
const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/"); // Redirect to home page if user is not logged in
  }

  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <h1 className="heading">Submit your Startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;

import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

export const meta = {
  title: "Submit your Startup",
  description: "Submit your startup to get it listed on our platform",
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

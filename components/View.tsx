// ** Custom Component
import Ping from "./Ping";
// ** Sanity
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEW_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { EyeIcon } from "lucide-react";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string | "" }) => {
  type StartupViewResult = {
    views: number;
  };

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch<StartupViewResult>(STARTUP_VIEW_QUERY, {
      id,
    });

  // ** update the view count in the database
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <div className="view-text">
        <div className="flex gap-1.5">
          <EyeIcon className="size-6" />
          <span className="text-16-medium">{totalViews}</span>
        </div>
      </div>
    </div>
  );
};

export default View;

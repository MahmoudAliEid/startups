"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: { [key: string]: string | number | boolean },
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Unauthorized",
      status: "error",
    });

  const { title, category, description, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      category,
      description,
      image: link,
      pitch,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.id,
      },
    };
    const res = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...res,
      error: "",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "error",
    });
  }
};

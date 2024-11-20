import { createClient } from "next-sanity";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
});

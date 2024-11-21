import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { Author_BY_GITHUB_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
// @ts-expect-error: NextAuth typings are not up-to-date
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      // @ts-expect-error: NextAuth typings are not up-to-date
      user: { name, email, image },
      // @ts-expect-error: NextAuth typings are not up-to-date
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(Author_BY_GITHUB_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    // @ts-expect-error: NextAuth typings are not up-to-date
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(Author_BY_GITHUB_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    // @ts-expect-error: NextAuth typings are not up-to-date
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

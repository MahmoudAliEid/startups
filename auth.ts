import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { Author_BY_GITHUB_QUERY } from "./sanity/lib/queries";

//@ts-expect-error: NextAuth typings are not up-to-date
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // @ts-expect-error: NextAuth typings are not up-to-date
    async signIn({ user, profile }) {
      try {
        const { name, email, image } = user;

        const githubProfile = profile as Record<string, any>; // Fallback for unknown types
        const { id, login, bio } = githubProfile;

        // Fetch existing user
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(Author_BY_GITHUB_QUERY, { id });

        // Create user if they don't exist
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name,
            email,
            username: login,
            image,
            bio: bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },
    // @ts-expect-error: NextAuth typings are not up-to-date
    async jwt({ token, account, profile }) {
      try {
        if (account && profile) {
          const githubProfile = profile as Record<string, any>;
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(Author_BY_GITHUB_QUERY, { id: githubProfile.id });

          if (user) {
            token.id = user._id;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },

    // @ts-expect-error: NextAuth typings are not up-to-date
    async session({ session, token }) {
      try {
        if (token.id) {
          session.user = { ...session.user, id: token.id }; // Attach ID to session
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

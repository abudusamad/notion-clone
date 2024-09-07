import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
 
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  })],
});
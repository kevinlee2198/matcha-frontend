import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    authorized: ({ auth }) => !!auth, // returns true if authenticated

    async jwt({ token, account }) {
      // Save the access_token to the JWT on initial login
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose the accessToken in the session for use in the app
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

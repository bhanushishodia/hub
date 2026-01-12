import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // ✅ ONLY anantya.ai allowed
      if (user.email?.endsWith("@anantya.ai")) {
        return true;
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        token.role = user.email === "admin@anantya.ai" ? "admin" : "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async redirect() {
      // ✅ ALWAYS dashboard
      return "/dashboard";
    },
  },
});

<<<<<<< HEAD
export { handler as GET, handler as POST };

=======
export { handler as GET, handler as POST };
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c

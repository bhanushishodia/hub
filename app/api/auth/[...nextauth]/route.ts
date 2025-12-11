import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Manual users
const USERS = [
  { email: "admin@anantya.ai", password: "Yashika@018", role: "admin" },
  { email: "user@anantya.ai", password: "Anantya@789", role: "user" },
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = USERS.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        if (!user) return null;
        return { id: user.email, email: user.email, role: user.role };
      },
    }),
  ],

  callbacks: {
    // ✅ Google + manual login allow only @anantya.ai
    async signIn({ user, account }) {
      // ✔️ If login is manual (credentials) → allow any email
      if (account?.provider === "credentials") {
        return true;
      }

      // ✔️ If login is Google → allow only @anantya.ai emails
      if (account?.provider === "google") {
        if (user.email?.endsWith("@anantya.ai")) return true;
        return false; // ❌ deny non-anantya emails
      }

      return false;
    },

    // ✅ JWT: set role
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "user";
      return token;
    },

    // ✅ Session: expose role
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },

    // ✅ Always redirect to dashboard
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },


  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // tumhara login page
  },
  // 🔥 ADD THIS FOR PRODUCTION COOKIE FIX
  cookies:
    process.env.NODE_ENV === "production"
      ? {
        sessionToken: {
          name: "__Secure-next-auth.session-token",
          options: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            domain: "knowledge-hub.anantya.ai", // add domain for cross-device login
          },
        },
      }

      : {
        sessionToken: {
          name: "next-auth.session-token",
          options: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
          },
        },
      },
});



export { handler as GET, handler as POST };

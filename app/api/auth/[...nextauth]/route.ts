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
    async signIn({ user }) {
      if (user.email?.endsWith("@anantya.ai")) return true;
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
// async redirect({ url, baseUrl }) {
//   // Allow proper Google callback processing
//   if (url.startsWith("/api/auth/callback")) {
//     return baseUrl;
//   }

//   return `${baseUrl}/dashboard`;
// }

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

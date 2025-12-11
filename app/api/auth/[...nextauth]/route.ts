import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Manual users
// Manual users
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
        if (!credentials) return null;

        const user = USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) return null;

        return { id: user.email, email: user.email, role: user.role };
      },
    }),
  ],

  callbacks: {
    // ✅ Sign in rules
    async signIn({ user, account }) {
      // Manual login → always allow
      if (!account || account.provider === "credentials") return true;

      // Google login → only @anantya.ai emails
      if (account.provider === "google") {
        return user.email?.endsWith("@anantya.ai") ?? false;
      }

      return false;
    },

    // ✅ Add role to JWT token
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "user";
      return token;
    },

    // ✅ Add role to session
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },

    // ✅ Redirect after login
    async redirect({ baseUrl, url }) {
      // If login via credentials or Google → dashboard
      if (url.includes("/dashboard")) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // Custom login page
  },

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
              domain: "knowledge-hub.anantya.ai",
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

  // ✅ Optional debug for dev
  debug: process.env.NODE_ENV !== "production",
});

export { handler as GET, handler as POST };

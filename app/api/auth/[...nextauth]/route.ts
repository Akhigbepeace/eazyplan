import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

type JWTProps = {
  token: {
    id: string;
    email: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
};

type SessionProps = {
  session: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  token: {
    id: string;
    email: string;
    name: string;
  };
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("eazyplan");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials?.email,
        });

        console.log({
          user,
          usersCollection,
          credentials,
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials?.password || "", user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: JWTProps) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: SessionProps) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };

import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { DBConnect } from "./db";

class CustomError extends CredentialsSignin {
  constructor(message) {
    super();
    this.code = message;
    this.message = message;
    this.stack = undefined;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials === null) {
          throw new CustomError("Please Provide Credentials");
        }
        try {
          await DBConnect();
          const user = await User.findOne({ email: credentials.email })
            .select("password name email ")
            .lean();

          if (user) {
            if (!user.password) {
              throw new CustomError(
                "You signed In through google please try that method",
              );
            }
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password,
            );
            if (isMatch) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
              };
            } else {
              throw new CustomError("Invalid Credentials");
            }
          } else {
            throw new CustomError("User not found");
          }
        } catch (error) {
          throw new CustomError(error.message);
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await DBConnect();
        const exisitingUser = await User.findOne({ email: user.email });
        if (!exisitingUser && account.provider === "google") {
          await User.create({
            email: user.email,
            name: user.name,
            username: user.email.split("@")[0],
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      try {
        await DBConnect();
        const dbUser = await User.findOne({ email: session.user.email }).select(
          "username ",
        );
        if (dbUser) {
          ((session.user.username = dbUser.username),
            (session.user.id = dbUser._id.toString()));
        }
        return session;
      } catch (error) {
        return session;
      }
    },
  },
});

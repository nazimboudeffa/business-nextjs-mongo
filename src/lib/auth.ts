import { connect } from "@/utils/config/dbConfig";
import User from "@/utils/models/auth";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
        async authorize(credentials): Promise<any> {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          try {
            await connect();
            const user = await User.findOne({ email });
            if (!user) {
              return null;
            }
            const passwordsMatch = await bcryptjs.compare(
              password,
              user.password
            );
            if (!passwordsMatch) {
              return null;
            }
            return user;
          } catch (error) {
            console.log("Error:", error);
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/sign-in",
    },
  };
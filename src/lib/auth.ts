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
            const res = await fetch(process.env.BACKEND_URL+'/auth/sign-in', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email: email, password: password})
              })
            if (!res.ok) {
                throw new Error('Error');
            }
            const data = await res.json();
            return data.user;
          } catch (error) {
            console.log("Error: ", error);
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
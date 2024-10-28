// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   pages: {
//     signIn: "/sign-in",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email *", type: "input" },
//         password: { label: "******", type: "input" },
//       },
//       authorize: async (credentials, _req) => {
//         try {
//           if (!credentials?.email) return null;
//           if (!credentials?.password) return null;

//           const authenticateResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
//             {
//               method: "POST",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 // identifier: credentials?.email,
//                 email: credentials?.email,
//                 password: credentials?.password,
//               }),
//             }
//           );

//           if (authenticateResponse.ok) {
//             const data = await authenticateResponse.json();

//             return data;
//           }

//           return null;
//         } catch (error) {
//           return null;
//         }
//       },
//     }),

//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({
//       token,
//       account,
//       user,
//       trigger,
//     }: {
//       token: any;
//       account: any;
//       user: any;
//     }) {
//       // Persist the OAuth access_token to the token right after signin
//       // token.accessToken = account.user.access_token
//       if (user) {
//         token.accessToken = user?.jwt || null;
//         token.user = user?.user;
//       }
//       console.log(account, trigger, "trigger");
//       if (trigger === "update") {
//         console.log("Hi");
//       }

//       //   return token;
//       // }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken || null;
//       session.user = token.user || null;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email *", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _req) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const authenticateResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          const user = await authenticateResponse.json();
          if (authenticateResponse.ok) {
            return { ...user };
          } else if (
            user?.error?.message === "Your account has been blocked!"
          ) {
            throw new Error("Your account has been blocked!");
          } else {
            throw new Error(user?.message);
          }
          // } else if (
          //   user?.error?.message === "Your account has been blocked!"
          // ) {
          //   throw new Error("Your account has been blocked!");
          // } else {
          //   throw new Error(JSON.stringify(user));
          // }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    CredentialsProvider({
      name: "otp-verify",
      id: "otp-verify",
      credentials: {
        email: { label: "Email *", type: "email" },
        otp: { label: "otp", type: "text" },
      },
      authorize: async (credentials, _req) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/otp-verify`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (response.ok) {
            return await response.json();
          } else {
            throw new Error("Failed to verify otp");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user, trigger }: any) {
      if (user) {
        token.accessToken = user?.jwt || null;
        token.user = user?.user;
      }
      // if (trigger === "update") {
      //   console.log("Hi");
      // }
      return token;
    },
    async session({ session, token }: any) {
      // console.log(session, token, "user routes");
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

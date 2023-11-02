import NextAuth from "next-auth";
// import { FirebaseAdapter } from "next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";

// import firebase from "../../../src/firebase/config";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);

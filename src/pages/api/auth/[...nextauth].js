import NextAuth from "next-auth";
// import { FirebaseAdapter } from "next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";

// import firebase from "../../../src/firebase/config";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider(
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
      // authorize: async (GoogleProvider) => {
      //   // Use Firebase to verify the Google token and retrieve user data
      //   // Add your authentication logic here using Firebase's GoogleAuthProvider
      //   const { token } = GoogleProvider;
      //   const googleCredential =
      //     firebase.auth.GoogleAuthProvider.credential(token);
      //   const userCredential = await firebase
      //     .auth()
      //     .signInWithCredential(googleCredential);
      //   if (userCredential.user) {
      //     return Promise.resolve(userCredential.user);
      //   } else {
      //     return Promise.resolve(null);
      //   }
      // },
    ),

    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "email" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch("/your/endpoint", {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" }
    //     })
    //     const user = await res.json()

    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user
    //     }
    //     // Return null if user data could not be retrieved
    //     return null
    //   }
    // })
  ],
  // adapter: FirebaseAdapter(firebase.firestore()),
  pages: {
    signin: "/signin",
    signout: "/signout",
    content: "/content",
  },
};

export default NextAuth(authOptions);

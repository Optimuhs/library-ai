// import { GetServerSidePropsContext } from "next";
// import { getServerSession } from "next-auth";
// import { getProviders, signOut } from "next-auth/react";
// import { authOptions } from "../api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: { destination: "http://localhost:3000/signin" },
//     };
//   }
//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }

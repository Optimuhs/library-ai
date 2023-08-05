import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Content({
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Welcome to the libaray</h1>
      <p>Here is some content {name}</p>
      <button onClick={() => signOut({ callbackUrl: "/signin" })}>
        SignOut
      </button>
    </div>
  );
}

// Context automatically provided by next when this function is called
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: { destination: "/signin" },
    };
  } else {
    const { user } = session;
    console.log(user);
    return { props: { name: user?.name } };
  }
}

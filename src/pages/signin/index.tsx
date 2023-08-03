import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => {
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign In with {provider.name}
          </button>
        </div>;
      })}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: { destination: "/content" },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

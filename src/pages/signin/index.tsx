import clsx from "clsx";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import "../../app/globals.css";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div
        className={clsx(
          "p-10",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "bg-darker-gold",
          "space-x-5",
          "text-3xl",
          "text-cream"
        )}
      >
        <Link href={"/"}>
          <h2 className={clsx("font-semibold")}>
            Welcome to the Annie Webb Blanton Library{" "}
          </h2>
        </Link>
      </div>
      <div
        className={clsx(
          "text-xl",
          "text-royal-blue",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "text-center",
          "m-5"
        )}
      >
        <h1>Sign in to checkout books!</h1>
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className={clsx(
              "bg-royal-blue",
              "text-xl",
              "text-cream",
              "w-1/4",
              "m-5",
              "p-5",
              "rounded-lg"
            )}
          >
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: { destination: `/checkout` },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

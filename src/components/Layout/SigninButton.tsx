import clsx from "clsx";
import { useRouter } from "next/router";

export const SignInButton = () => {
  const router = useRouter();
  async function signinRedirect() {
    router.push("/signin");
  }

  return (
    <div
      onClick={() => signinRedirect()}
      className={clsx(
        "bg-stone-400",
        "w-fit",
        "p-2",
        "m-1",
        "flex",
        "flex-row",
        "items-center",
        "justify-center"
      )}
    >
      Sign In
    </div>
  );
};

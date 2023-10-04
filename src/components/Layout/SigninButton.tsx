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
        // "bg-stone-400",
        "w-fit",
        "sm:p-2",
        "sm:m-1",
        "flex",
        "flex-row",
        "items-center",
        "justify-center",
        "text-center",
        "rounded-lg"
      )}
    >
      Login
    </div>
  );
};

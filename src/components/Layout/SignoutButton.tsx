import clsx from "clsx";
import { useRouter } from "next/router";

export const SignOutButton = () => {
  const router = useRouter();
  async function signOutRedirect() {
    router.push("/signout");
  }

  return (
    <div
      onClick={() => signOutRedirect()}
      className={clsx(
        // "bg-stone-400",
        "w-fit",

        "flex",
        "flex-row",
        "sm:m-1",
        "items-center",
        "justify-center"
      )}
    >
      Sign Out
    </div>
  );
};

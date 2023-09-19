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
        "bg-stone-400",
        "w-fit",
        "p-2",
        "flex",
        "flex-row",
        "m-1",
        "items-center",
        "justify-center"
      )}
    >
      Sign Out
    </div>
  );
};

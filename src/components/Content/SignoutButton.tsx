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
      className={clsx("bg-stone-400", "w-fit", "p-3", "flex", "m-10")}
    >
      Click here to Sign Out
    </div>
  );
};

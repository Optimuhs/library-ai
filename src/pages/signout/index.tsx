import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import "../../app/globals.css";

export default function SignOut() {
  return (
    <div className={clsx("flex", "flex-col", "justify-center", "items-center")}>
      <div
        className={clsx(
          "p-10",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "bg-darker-gold",
          "w-full",
          "text-3xl",
          "text-cream"
        )}
      >
        <Link href={"/"}>
          <h2 className={clsx("font-semibold")}>
            Leaving the Annie Webb Blanton Library{" "}
          </h2>
        </Link>
      </div>
      <div
        className={clsx(
          "text-xl",
          "bg-royal-blue",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "text-center",
          "m-5",
          "w-1/4",
          "text-cream",
          "p-5",
          "rounded-lg"
        )}
      >
        <button onClick={() => signOut({ callbackUrl: "/signin" })}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

import clsx from "clsx";
import Link from "next/link";
import { Navbar } from "./Navbar";

export function Header({ userData }) {
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
      <Navbar userData={userData} />
    </div>
  );
}

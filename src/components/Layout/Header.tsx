import clsx from "clsx";
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
          "text-3xl"
        )}
      >
        <h2>Welcome to the Annie Webb Blanton Library </h2>
      </div>
      <Navbar userData={userData} />
    </div>
  );
}

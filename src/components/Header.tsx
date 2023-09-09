import clsx from "clsx";
import { Navbar } from "./Layout/Navbar";
export function Header() {
  return (
    <div
      className={clsx(
        "p-10",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "bg-yellow-600",
        "space-x-5"
      )}
    >
      <h1>Welcome to the Blanton Library Database</h1>
      <Navbar />
    </div>
  );
}

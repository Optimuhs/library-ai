import clsx from "clsx";
import { SearchBox } from "./Content/Search";
export function Header() {
  return (
    <div
      className={clsx(
        "bg-yellow-400",
        "p-10",
        "flex",
        "items-center",
        "justify-center"
      )}
    >
      <h1>Welcome to the Blanton Library Database</h1>
      <SearchBox />
    </div>
  );
}

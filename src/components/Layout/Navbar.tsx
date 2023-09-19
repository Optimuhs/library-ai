import clsx from "clsx";
import Link from "next/link";
import { SignInButton } from "./SigninButton";
import { SignOutButton } from "./SignoutButton";

export const Navbar = ({ userData }) => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-row",
        "align-center",
        "justify-center",
        "bg-royal-blue"
      )}
    >
      <nav
        className={clsx(
          "flex",
          "flex-row",
          "items-center",
          "justify-center",
          "mr-auto",
          "p-4",
          "ml-4"
        )}
      >
        <ul
          className={clsx(
            "flex",
            "flex-row",
            "items-center",
            "justify-center",
            "space-x-5"
          )}
        >
          <Link href={"/checkout"}>
            <li>Checkout</li>
          </Link>
          <Link href={"/checkin"}>
            <li>Checkin</li>
          </Link>
          <Link href={"/reservations"}>
            <li>Reservations</li>
          </Link>
        </ul>
      </nav>
      <div className={clsx("flex", "flex-row", "mr-4")}>
        {userData != undefined ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
};

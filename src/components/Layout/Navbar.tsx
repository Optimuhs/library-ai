import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignInButton } from "./SigninButton";
import { SignOutButton } from "./SignoutButton";

export const Navbar = ({ userData }) => {
  const [toggle, setToggle] = useState(false);

  const ToggleHandler = () => {
    const newState = !toggle;
    setToggle(newState);
  };

  return (
    <div>
      <div
        className={clsx(
          "flex",
          "flex-col",
          "sm:flex-row",
          "align-center",
          "justify-center",
          "bg-royal-blue",
          "items-center"
        )}
      >
        <div
          onClick={() => ToggleHandler()}
          className={clsx(
            "flex",
            "justify-center",
            "items-center",
            "flex-col",
            "sm:hidden",
            "py-2",
            toggle ? "rotate-180" : ""
          )}
        >
          {/* Conditionally render down or up based on state */}
          <Image
            src="/angle-circle-down.png"
            alt="dropdown arrow"
            width={40}
            height={40}
          />
        </div>
        <div
          className={clsx(
            "transition-all duration-700",
            "max-h-0",
            "overflow-hidden",
            toggle ? "max-h-screen" : "",
            "sm:contents",
            "sm:flex",
            "sm:flex-row"
          )}
        >
          <ul
            className={clsx(
              "flex",
              "flex-col",
              "sm:flex-row",
              "items-center",
              "justify-center",
              "align-center",
              "sm:space-x-5",
              "space-y-10",
              "text-cream",
              "ml-0",
              "my-5",
              "sm:my-0",
              "sm:space-y-0",
              "text-xl",
              "p-3"
            )}
          >
            <Link
              href={"/checkout"}
              className={clsx("flex", "items-center", "justify-center")}
            >
              <li>Check-out / Check-in</li>
            </Link>
            <Link
              href={"/reservations"}
              className={clsx("flex", "items-center", "justify-center")}
            >
              <li>Reservations</li>
            </Link>
            <div
              className={clsx(
                "flex",
                "flex-row",
                "sm:mr-4",
                "text-cream",
                "ml-0"
              )}
            >
              {userData != undefined ? <SignOutButton /> : <SignInButton />}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

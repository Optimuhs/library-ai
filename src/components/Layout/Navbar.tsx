import clsx from "clsx";
import Link from "next/link";
export const Navbar = () => {
  return (
    <div className={clsx("flex", "flex-row")}>
      <nav>
        <ul className={clsx("flex", "flex-row", "space-x-5")}>
          <Link href={"/checkout"}>
            <li>Checkout</li>
          </Link>
          <Link href={"/checkin"}>
            <li>Checkin</li>
          </Link>
          <Link href={"/reservation"}>
            <li>Reservations</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

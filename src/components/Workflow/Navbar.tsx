import Link from "next/link";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
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

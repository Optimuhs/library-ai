import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BookReservationComp } from "./BookResComp";

export const ConfirmedReservations = ({ props }) => {
  const [reservations, setReservations] = useState<any>([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // Call the function initially
    getReservations();
  });

  async function getReservations() {
    try {
      const response = await fetch(
        `./api/getUserReservations?userId=${props.id}`
      );

      if (response.ok) {
        const result = await response.json();
        setReservations(result);
      } else {
        console.error("Failed to fetch reservations");
      }
    } catch (error) {
      console.error("An error occurred while fetching reservations:", error);
    }
  }

  const ToggleHandler = () => {
    const newState = !toggle;
    setToggle(newState);
  };

  return (
    <div className={clsx("space-y-3", "m-10")}>
      <div
        onClick={() => ToggleHandler()}
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "flex-col",
          toggle ? "rotate-180" : ""
        )}
      >
        {/* Conditionally render down or up based on state */}
        <Image
          src="/down-chevron.png"
          alt="dropdown arrow"
          width={50}
          height={50}
        />
      </div>
      <div
        className={clsx(
          "md:grid",
          "md:grid-cols-2",
          "transition-all duration-700",
          "max-h-0",
          "overflow-hidden",
          toggle ? "max-h-screen" : "",
          "sm:contents"
        )}
      >
        {reservations.map((elem) => (
          <div key={elem.id}>
            <BookReservationComp
              title={elem.book.title}
              resId={elem.id}
              bookId={elem.bookId}
              isbn={elem.bookISBN}
              reservationDate={elem.reservationAt}
              reservationExpires={elem.reservationExpiry}
              userId={props.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

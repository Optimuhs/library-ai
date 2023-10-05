import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { BookReservationComp } from "./BookResComp";

export const ConfirmedReservations = ({ props }) => {
  const [reservations, setReservations] = useState<any>([]);

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

  return (
    <div
      className={clsx("text-royal-blue", "mx-10", "md:grid", "md:grid-cols-2")}
    >
      {reservations.map((elem) => (
        <div key={elem.id}>
          <BookReservationComp
            title={elem.title}
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
  );
};

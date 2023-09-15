import { useEffect, useState } from "react";
import { BookReservationComp } from "./BookResComp";

export const ConfirmRes = ({ props }) => {
  const [reservations, setReservations] = useState<any>([]);

  useEffect(() => {
    // Call the function initially
    getReservations();
  });

  async function getReservations() {
    try {
      const response = await fetch(`./api/getUserReservations?userId=${props}`);

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
    <div>
      {reservations &&
        reservations.map((elem) => (
          <div key={elem.id}>
            <BookReservationComp
              resId={elem.id}
              bookId={elem.bookId}
              isbn={elem.bookISBN}
              reservationDate={elem.reservationAt}
              reservationExpires={elem.reservationExpiry}
              userId={props}
            />
          </div>
        ))}
    </div>
  );
};
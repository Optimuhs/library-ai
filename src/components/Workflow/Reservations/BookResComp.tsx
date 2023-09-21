import clsx from "clsx";
import { useState } from "react";

type BookDataType = {
  isbn: string;
  bookId: number;
  userId: number;
  reservationDate: Date;
  reservationExpires: Date;
  resId: number;
  title: string;
};

type checkoutStatus = {
  message: string;
  error: boolean;
};

export const BookReservationComp = (props: BookDataType) => {
  const startingData = {
    isbn: props.isbn,
    bookId: props.bookId,
    userid: props.userId,
    reservationDate: props.reservationDate,
    reservationExpires: props.reservationExpires,
    resId: props.resId,
  };

  const [status, setStatus] = useState<checkoutStatus | null>(null);

  // Handle checkout url case
  async function checkout() {
    try {
      const response = await fetch(
        `./api/updateReservation?bookId=${startingData.bookId}&userid=${startingData.userid}&isbn=${startingData.isbn}&resId=${startingData.resId}`
      );

      if (response.ok) {
        // If the checkout is successful, you can handle it here
        // For example, display a success message or update the UI
        setStatus({ message: "Checkout successful", error: false });
      } else {
        // If there is an error, set the error state to display an error message
        setStatus({
          message: "The book is already checked out, try again later.",
          error: true,
        });
      }
    } catch (e) {
      // Handle network errors or exceptions here
      setStatus({
        message: "An error occurred. Please try again later.",
        error: true,
      });
    }
  }

  // Conditionally render the component based on the status
  if (status && !status.error) {
    // If the query is successful (status is not null and error is false),
    // return null to hide the component
    return null;
  }

  return (
    <div className={clsx("md:grid", "md:grid-cols-2")}>
      <div className={clsx("p-5", "text-royal-blue")}>
        <ul>
          <li>Title: {props.title}</li>
          <li>ISBN: {props.isbn}</li>
          <li>Reservation Date:{String(props.reservationDate)}</li>
          <li>Reservation Expires: {String(props.reservationExpires)}</li>
        </ul>
        <div
          onClick={() => checkout()}
          className={clsx("text-royal-blue", "border-black")}
        >
          Checkout
        </div>
        {status && (
          <div className={status.error ? "text-red-500" : "text-green-400"}>
            {status?.message}
          </div>
        )}
      </div>
    </div>
  );
};

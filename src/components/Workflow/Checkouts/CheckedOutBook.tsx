import clsx from "clsx";
import { useState } from "react";

type BookDataType = {
  title: string;
  isbn: string;
  bookId: number;
  userId: number;
  dueDate: Date;
};

type checkoutStatus = {
  message: string;
  error: boolean;
};

export const CheckedOutBook = (props: BookDataType) => {
  const startingData = {
    isbn: props.isbn,
    bookId: props.bookId,
    userid: props.userId,
    dueDate: props.dueDate,
  };

  const [status, setStatus] = useState<checkoutStatus | null>(null);

  // Handle checkout url case
  async function checkin() {
    try {
      const response = await fetch(
        `./api/checkBookIn?userid=${startingData.userid}&isbn=${startingData.isbn}`
      );

      if (response.ok) {
        // If the checkout is successful, you can handle it here
        // For example, display a success message or update the UI
        setStatus({ message: "Checkin successful", error: false });
      } else {
        // If there is an error, set the error state to display an error message
        setStatus({
          message: "The book is already checked in",
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
    <div className={clsx("p-5", "text-royal-blue")}>
      <ul>
        <li>Title: {props.title}</li>
        <li>ISBN: {props.isbn}</li>
        <li>Due Date: {String(props.dueDate)}</li>
      </ul>
      <div
        onClick={() => checkin()}
        className={clsx("text-royal-blue", "border-black")}
      >
        Checkin
      </div>
      {status && (
        <div className={status.error ? "text-red-500" : "text-green-400"}>
          {status?.message}
        </div>
      )}
    </div>
  );
};

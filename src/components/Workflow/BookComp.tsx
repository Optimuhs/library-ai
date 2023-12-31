import clsx from "clsx";
import { useState } from "react";
type BookDataType = {
  title: string;
  isbn: string;
  id: number;
  userid: number;
};

type checkoutStatus = {
  message: string;
  error: boolean;
};

export const BookComp = (props: BookDataType) => {
  const startingData = {
    title: props.title,
    isbn: props.isbn,
    id: props.id,
    userid: props.userid,
  };

  const [status, setStatus] = useState<checkoutStatus | null>(null);

  // Handle checkout url case
  async function checkout() {
    try {
      console.log(startingData.userid, "data");
      console.log(props.userid, "id test");
      const response = await fetch(
        `./api/checkBookAvailability?id=${startingData.id}&userid=${
          startingData.userid
        }&isbn=${startingData.isbn}&rentalTrue=${true}`
      );
      console.log(startingData.userid);
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

  // Handle the reservation url case
  async function reserve() {
    try {
      const response = await fetch(
        `./api/checkBookAvailability?id=${startingData.id}&userid=${
          startingData.userid
        }&isbn=${startingData.isbn}&reserveTrue=${true}`
      );

      if (response.ok) {
        setStatus({ message: "Reservation Successful", error: false });
      } else {
        setStatus({
          message: "The book is already reserved, try again later.",
          error: true,
        });
      }
    } catch (error) {
      setStatus({
        message: "An error occurred. Please try again later.",
        error: true,
      });
    }
  }

  // Get the current URL
  const currentUrl = window.location.href;

  // Conditionally render a button based on the URL
  const renderButton = () => {
    if (currentUrl.includes("/checkout")) {
      // Render the button on a specific page
      return (
        <div onClick={() => checkout()} className={clsx("border-black")}>
          Checkout
        </div>
      );
    }
    if (currentUrl.includes("/reservations")) {
      // Render nothing on other pages
      return (
        <div
          onClick={() => reserve()}
          className={clsx("text-red-400", "border-black")}
        >
          Reserve
        </div>
      );
    }
  };

  return (
    <div className={clsx("p-5")}>
      <p>
        ISBN: {props.isbn} Title: {props.title}
      </p>
      {renderButton()}
      {status && (
        <div className={status.error ? "text-red-500" : "text-green-400"}>
          {status?.message}
        </div>
      )}
    </div>
  );
};

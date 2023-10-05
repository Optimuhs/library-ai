import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckedOutBook } from "./CheckedOutBook";
export const CurrentlyOut = ({ props }) => {
  const [checkedOut, setCheckedOut] = useState<any>([]);
  const [toggle, setToggle] = useState(false);

  const ToggleHandler = () => {
    const newState = !toggle;
    setToggle(newState);
  };

  useEffect(() => {
    getCheckedOutBooks(); // Call the async function directly
  });

  async function getCheckedOutBooks() {
    try {
      const response = await fetch(
        `./api/getCheckedOutBooks?userId=${props.id}`
      );
      if (response.ok) {
        const result = await response.json();
        setCheckedOut(result);
      } else {
        console.error("Failed to fetch checked out books");
      }
    } catch (error) {
      console.error("An error has occurred fetching checked out books", error);
    }
  }

  return (
    <div className={clsx("space-y-3")}>
      <h3 className={clsx("text-2xl", "font-semibold")}>
        Currently checked out books for{" "}
        {`${props?.firstName} ${props?.lastName} `}
      </h3>
      <div
        onClick={() => ToggleHandler()}
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "flex-col",
          "sm:hidden",
          "my-10",
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
        {checkedOut.map((elem) => (
          <div key={elem.id}>
            <CheckedOutBook
              title={elem.bookOut.title}
              isbn={elem.bookISBN}
              userId={elem.borrowerId}
              bookId={elem.booksOutId}
              dueDate={elem.dueDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

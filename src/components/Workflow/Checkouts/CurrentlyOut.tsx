import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { CheckedOutBook } from "./CheckedOutBook";

export const CurrentlyOut = ({ props }) => {
  const [checkedOut, setCheckedOut] = useState<any>([]);

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
      <div className={clsx("md:grid", "md:grid-cols-2")}>
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

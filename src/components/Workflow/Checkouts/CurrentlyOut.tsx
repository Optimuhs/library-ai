import { useEffect, useState } from "react";
import { CheckedOutBook } from "./CheckedOutBook";

export const CurrentlyOut = ({ userId }) => {
  const [checkedOut, setCheckedOut] = useState<any>([]);

  useEffect(() => {
    getCheckedOutBooks(); // Call the async function directly
  });

  async function getCheckedOutBooks() {
    try {
      const response = await fetch(`./api/getCheckedOutBooks?userId=${userId}`);
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
    <div>
      <h3>Currently checked out books</h3>
      <div>
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

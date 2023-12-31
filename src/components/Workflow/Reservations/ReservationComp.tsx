import clsx from "clsx";
import { useState } from "react";
import { BookComp } from "../BookComp";

export const ReservationComp = ({ props }) => {
  const [searchRes, setSearchRes] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null); // State for storing the response result
  const [error, setError] = useState<string | null>(null); // State for storing error message

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRes(event.target.value);
    SearchHandler(event.target.value);
  };

  const SearchHandler = async (e: string) => {
    try {
      const response = await fetch(
        `./api/getSpecificBook?bookString=${searchRes}&reserveTrue=${true}`
      );

      if (response.ok) {
        const result = await response.json();
        setSearchResult(result); // Update the result state
        setError(null); // Clear any previous error
      } else {
        setError("Item not found"); // Set the error message
        setSearchResult(null); // Clear any previous result
      }
    } catch (err) {
      setError("Error occurred"); // Set the error message
      setSearchResult(null); // Clear any previous result
    }
  };

  return (
    <div className={clsx("text-royal-blue", "m-10", "space-y-2")}>
      {/* Display the books a user wants to search for */}
      <h2 className={clsx("font-semibold", "text-xl")}>
        Reserve your book&apos;s here, enter the ISBN or Name of the book
      </h2>
      <div>
        <form>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Book ISBN/ Name"
            className={clsx(
              "text-black",
              "border",
              "rounded",
              "border-black",
              "p-1"
            )}
          ></input>
        </form>
        {searchResult &&
          searchResult.map((elem) => (
            <div key={elem.id} className={clsx("text-royal-blue")}>
              {/* Render specific properties of the element */}
              <BookComp
                title={elem.title}
                isbn={elem.isbn}
                id={elem.id}
                userid={props.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

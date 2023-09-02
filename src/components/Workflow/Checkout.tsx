import { clsx } from "clsx";
import { useState } from "react";
import { BookComp } from "./BookComp";

export const Checkout = ({ props }) => {
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
        `/api/getSpecificBook?bookString=${searchRes}`
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
    <div>
      <div>
        <p>Type the book's ISBN or Title to search the book for checkout</p>
      </div>
      <form>
        <input
          type="text"
          placeholder="ISBN / Title"
          onChange={handleInputChange}
          className={clsx("text-black")}
        />
      </form>
      {searchResult &&
        searchResult.map((elem) => (
          <div key={elem.id} className={clsx("text-white")}>
            {/* Render specific properties of the element */}
            <BookComp
              title={elem.title}
              isbn={elem.isbn}
              id={elem.id}
              userid={props}
            />
          </div>
        ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

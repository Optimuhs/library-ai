import { clsx } from "clsx";
import { useState } from "react";
export const Checkout = () => {
  const [searchRes, setSearchRes] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null); // State for storing the response result
  const [error, setError] = useState<string | null>(null); // State for storing error message

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRes(event.target.value);
    checkoutHandler(event.target.value);
  };

  const checkoutHandler = async (e: string) => {
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
            <div className={clsx("p-5")}>
              <p>
                ISBN: {elem.isbn} Title: {elem.title}
              </p>
            </div>
          </div>
        ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

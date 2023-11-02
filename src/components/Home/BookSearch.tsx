import clsx from "clsx";
import { useState } from "react";
import { BookSearchComp } from "./BookSearchComp";

export const BookSearch = () => {
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
        console.log(result);
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
      <div
        className={clsx(
          "flex",
          "flex-col",
          "sm:flex-row",
          "justify-center",
          "items-center"
        )}
      >
        <h3 className={clsx("text-xl")}>Search for books here: </h3>

        <form>
          <input
            type="text"
            placeholder=" ISBN / Title"
            onChange={handleInputChange}
            className={clsx("p-1", "ml-1", "rounded", "border", "border-black")}
          ></input>
        </form>
      </div>
      <div
        className={clsx(
          "md:grid",
          "md:grid-cols-2",
          "md:grid-rows-5",
          "md:grid-flow-col"
        )}
      >
        {searchResult &&
          searchResult.map((elem) => (
            <div key={elem.id}>
              <BookSearchComp
                title={elem.title}
                isbn={elem.isbn}
                id={elem.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

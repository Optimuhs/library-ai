import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
type checkinStatus = {
  message: string;
  error: boolean;
};

export const CheckinComponent = (props) => {
  const [formData, setFormData] = useState({
    isbn: "",
  });
  const [state, setState] = useState<checkinStatus | null>(null);

  // Event handler to update form data when input fields change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, isbn: value });
  };

  const CheckinHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(props);
    try {
      const response = await fetch(
        `/api/checkBookIn?isbn=${formData.isbn}&userId=${props.userId}`
      );
      if (response.ok) {
        const result = await response.json();
        setState({
          message: "Checkin successful",
          error: false,
        });
      }
    } catch (err) {
      setState({
        message: "Checkin failed",
        error: true,
      });
    }
  };

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "m-10",
        "space-y-5",
        "text-royal-blue"
      )}
    >
      <h2 className={clsx("text-2xl", "font-semibold")}>
        Enter your book ISBN to check in your book
      </h2>
      <form onSubmit={CheckinHandler} className={clsx("space-x-5")}>
        <input
          className={clsx(
            "text-black",
            "border",
            "rounded",
            "border-black",
            "p-1"
          )}
          type="text"
          value={formData.isbn}
          onChange={handleInputChange}
          placeholder="Enter ISBN"
        />
        {state && (
          <div className={state.error ? "text-red-500" : "text-green-400"}>
            {state.message}
          </div>
        )}
        <button
          type="submit"
          className={clsx("border", "rounded", "border-black", "p-1")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

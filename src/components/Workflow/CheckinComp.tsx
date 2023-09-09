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
    <div>
      <form onSubmit={CheckinHandler}>
        <input
          className={clsx("text-black")}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

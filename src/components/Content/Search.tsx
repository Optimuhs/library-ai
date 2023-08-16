import { useRef } from "react";

export const SearchBox = () => {
  const query = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div>
      <form>
        hs
        <button type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

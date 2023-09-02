import clsx from "clsx";

type BookDataType = {
  title: string;
  isbn: string;
  id: number;
  userid: number;
};

export const BookComp = (props: BookDataType) => {
  const startingData = {
    title: props.title,
    isbn: props.isbn,
    id: props.id,
    userid: props.userid,
  };
  // const [checkoutData, setCheckoutData] = useState(startingData);

  async function checkout() {
    try {
      console.log("b click");
      const res = await fetch(
        `./api/checkoutBook?id=${startingData.id}&userid=${startingData.userid}`
      );
      console.log("click");
      console.log(res);

      if (res.ok) {
        const result = await res.json();
      } else {
      }
    } catch (e) {
      return e;
    }
  }

  return (
    <div className={clsx("p-5")}>
      <p>
        ISBN: {props.isbn} Title: {props.title}
      </p>
      <div onClick={() => checkout()}>Checkout</div>
    </div>
  );
};

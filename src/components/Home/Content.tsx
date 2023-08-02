import clsx from "clsx";
export const Content = () => {
  return (
    <div className={clsx("flex", "flex-col", "p-10")}>
      <section>
        <p>
          Welcome to the Blanton Library Database. Here you will be able to...
        </p>
        <ul className={clsx("flex", "flex-col", "p-5")}>
          <li>Search for books</li>
          <li>Checkout/Checkin Books</li>
          <li>Ask our AI assistant questions</li>
        </ul>
        <div className={clsx("flex", "justify-center", "items-center")}></div>
      </section>
    </div>
  );
};

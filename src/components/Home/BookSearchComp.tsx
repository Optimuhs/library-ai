import clsx from "clsx";
import Image from "next/image";
type BookDataType = {
  title: string;
  isbn: string;
  id: number;
};

export const BookSearchComp = (props: BookDataType) => {
  // const startingData = {
  //   title: props.title,
  //   isbn: props.isbn,
  //   id: props.id,
  //   userid: props.userid,
  // };

  return (
    <div
      className={clsx(
        "w-46",
        "m-5",
        "flex",
        "flex-col",
        "justify-center",
        "p-8"
      )}
    >
      <div className={clsx("flex", "items-center", "justify-center")}>
        <Image src="/#" height={100} width={100} alt="Book Picture" />
      </div>

      <ul>
        <li>Title: {props.title}</li>
        <li>ISBN: {props.isbn} </li>
      </ul>
    </div>
  );
};

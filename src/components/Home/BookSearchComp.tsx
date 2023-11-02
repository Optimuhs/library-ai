import clsx from "clsx";
import Image from "next/image";
// import { useEffect, useState } from "react";

type BookDataType = {
  title: string;
  isbn: string;
  id: number;
};

export const BookSearchComp = (props: BookDataType) => {
  // const [coverUrl, setCoverUrl] = useState("");

  // useEffect(() => {
  //   fetchBookCover(props.isbn).then((data) => {
  //     if (data) {
  //       setCoverUrl(data);
  //     }
  //   });
  // }, [props.isbn]);

  // const fetchBookCover = async (isbn: string) => {
  //   try {
  //     const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  //     const response = await fetch(url);
  //     console.log(response.body, "url");
  //     if (response.ok) {
  //       // Get the image data as a blob
  //       const imageBlob = await response.blob();

  //       // Create a URL for the blob data
  //       const imageUrl = URL.createObjectURL(imageBlob);

  //       setCoverUrl(imageUrl);

  //       return imageUrl;
  //     } else {
  //       console.log(`HTTP Error: ${response.status}`);
  //       setCoverUrl(""); // Set coverUrl to an empty string to indicate no cover available
  //     }
  //   } catch (error) {
  //     console.error("Error fetching book cover:", error);
  //     setCoverUrl(""); // Set coverUrl to an empty string to indicate no cover available
  //   }
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
      <div className={clsx("flex", "items-center", "justify-center", "z-50")}>
        {props.isbn ? (
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${props.isbn.trim()}-M.jpg`}
            height={300}
            width={300}
            alt="Book Picture"
          />
        ) : (
          <div>No cover available </div>
        )}
      </div>

      <ul>
        <li>Title: {props.title}</li>
        <li>ISBN: {props.isbn} </li>
      </ul>
    </div>
  );
};

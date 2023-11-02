import clsx from "clsx";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "../app/globals.css";
import { Content } from "../components/Home/Content";
import { Header } from "../components/Layout/Header";

export default function Home() {
  type Book = {
    id: number;
    title: string;
    isbn: string;
    shelfLocation: string;
    bookLevelColor: string;
    bookLevel: string;
    rented: boolean;
    rentalId: null;
    reservationId: null;
  };

  type User = {
    id: number;
    firstName: string;
    lastName: string;
    idNumber: string;
    email: string;
  };

  type BookContextType = {
    books: Book[];
    setBooks: (newBooks: Book[]) => void;
  };

  const [books, setBooks] = useState<BookContextType | []>([]);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    // Fetch and update the books data
    async function fetchBooksData() {
      try {
        const response = await fetch("/api/getAllBooks");
        if (response.ok) {
          const data = await response.json();
          setBooks(data); // Update the books state
        } else {
          console.error("Error fetching books:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    async function checkUser() {
      const user = await getSpecificUser();
      if (user) {
        setUserData(user);
      }
    }
    checkUser();
    fetchBooksData();
  }, [setBooks]); // Include setBooks in the dependency array

  return (
    <div>
      <Header userData={userData?.id} />
      <Content />
      <div
        className={clsx(
          "text-royal-blue",
          "flex",
          "flex-col",
          "justify-center",
          "items-center"
        )}
      >
        <p>Images were sourced from: https://openlibrary.org</p>
      </div>
    </div>
  );
}

async function getSpecificUser() {
  const session = await getSession();

  try {
    if (session) {
      const res = await fetch(
        `/api/getSpecificUser?email=${session?.user?.email}`
      );
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      return res.json();
    }
  } catch (err) {
    throw err;
  }
}

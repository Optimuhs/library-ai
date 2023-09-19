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

  type BookContextType = {
    books: Book[];
    setBooks: (newBooks: Book[]) => void;
  };
  const [books, setBooks] = useState<BookContextType | []>([]);

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

    fetchBooksData();
  }, [setBooks]); // Include setBooks in the dependency array

  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

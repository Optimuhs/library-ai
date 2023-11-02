import { ReactNode, createContext, useContext, useState } from "react";

// Define types
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
export const BookContext = createContext<BookContextType>({
  books: [],
  setBooks: () => {
    // Placeholder function, actual implementation will replace this
    console.warn("setBooks function is not yet implemented.");
  },
});

export const useBookContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  const setBooksContext = (newBooks: Book[]) => {
    setBooks(newBooks);
  };

  const contextValue: BookContextType = {
    books,
    setBooks: setBooksContext, // Use the properly typed setBooks function
  };

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};

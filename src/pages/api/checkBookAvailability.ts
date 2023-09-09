import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // Import your Prisma client

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bookId = Number(req.query.id);
    const userId = Number(req.query.userid);
    const bookIsbn = String(req.query.isbn);

    // Check if the book is already rented
    const rental = await prisma.rentals.findFirst({
      where: {
        booksOutId: bookId,
        checkedOut: true,
      },
    });

    if (!rental) {
      // Handle the case where the rental record for the user doesn't exist
      const newRental = await prisma.rentals.create({
        data: {
          checkedOut: true,
          checkedOutAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          borrowerId: userId, // Assign the correct 'userId' here
          booksOutId: bookId,
          bookISBN: bookIsbn,
        },
      });

      console.log("New book rented:", newRental);
      // Update rental
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: { rentalId: newRental.id },
      });

      console.log("Updated book:", updatedBook);
      const resObject = { rental: newRental, update: updatedBook };
      return res.status(200).json(resObject);
    } else {
      throw new Error(`Book with ID ${bookId} is already rented by a user`);
    }
  } catch (error) {
    // Handle the error and send an error response
    console.error(error); // Log the error
    res.status(400).json({ error: error.message });
  }
}

export default handler;

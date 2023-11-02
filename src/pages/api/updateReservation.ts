import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // Import your Prisma client

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ReservedBookId = Number(req.query.bookId);
    const userId = Number(req.query.userid);
    const bookIsbn = String(req.query.isbn);
    const resId = Number(req.query.resId);
    // Check if the book is already reserved
    const reservation = await prisma.reservation.findFirst({
      where: {
        id: resId,
        bookId: ReservedBookId,
        pending: true,
      },
    });
    console.log("res check", reservation);
    if (reservation?.userId == userId) {
      // Handle the case where the rental record for the user doesn't exist
      const newRental = await prisma.rentals.create({
        data: {
          checkedOut: true,
          checkedOutAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          borrowerId: userId, // Assign the correct 'userId' here
          booksOutId: ReservedBookId,
          bookISBN: bookIsbn,
        },
      });

      console.log("New book rented:", newRental);

      // Update rental to no longer be pending, and fulfill reservation date
      const reserveUpdate = await prisma.reservation.update({
        where: {
          id: resId,
        },
        data: {
          pending: false,
          reservationFulfilled: new Date(),
        },
      });

      // Update book
      const updatedBook = await prisma.book.update({
        where: {
          id: ReservedBookId,
        },
        data: { rentalId: newRental.id, reservationId: null },
      });

      const resObject = { rental: newRental, update: updatedBook };
      return res.status(200).json(resObject);
    } else {
      throw new Error(
        `Book with ID ${ReservedBookId} is already reserved/rented by a user`
      );
      return res.status(400).json({ message: "book unavailable" });
    }
  } catch (error) {
    // Handle the error and send an error response
    console.error(error); // Log the error
    res.status(400).json({ error: error.message });
  }
}

export default handler;

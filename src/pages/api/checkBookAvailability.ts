import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // Import your Prisma client

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const bookId = Number(req.query.id);
    const userId = Number(req.query.userid);
    const bookIsbn = String(req.query.isbn);
    const reserveTrue = Boolean(req.query?.reserveTrue);
    const rentalTrue = Boolean(req.query?.rentalTrue);

    // Check if the book is already rented
    const rental = await prisma.rentals.findFirst({
      where: {
        booksOutId: bookId,
        checkedOut: true,
        bookISBN: bookIsbn,
        borrowerId: userId,
      },
    });
    // Check if the book is already reserved
    const reservation = await prisma.reservation.findFirst({
      where: {
        bookId: bookId,
        pending: true,
        bookISBN: bookIsbn,
      },
    });

    if (
      !rental &&
      rentalTrue &&
      (reservation?.userId == userId || !reservation)
    ) {
      // Handle the case where the rental record for the user doesn't exist
      const newRental = await prisma.rentals.create({
        data: {
          checkedOut: true,
          checkedOutAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          borrowerId: userId, // Assign the correct 'userId' here
          booksOutId: bookId,
          bookISBN: bookIsbn,
          bookOut: {
            connect: {
              id: bookId,
            },
          },
        },
      });

      console.log("New book rented:", newRental);
      if (reservation?.userId == userId) {
        const reserveUpdate = await prisma.reservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            pending: false,
            reservationFulfilled: new Date(),
          },
        });
      }
      // Update rental
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
          reservationId: null,
        },
        data: {
          rentalId: newRental.id,
          reservationId: null,
        },
      });

      const resObject = { rental: newRental, update: updatedBook };
      return res.status(200).json(resObject);
    }

    if (!reservation && reserveTrue) {
      const newReservation = await prisma.reservation.create({
        data: {
          bookISBN: bookIsbn,
          bookId: bookId,
          pending: true,
          reservationAt: new Date(),
          userId: userId,
          reservationExpiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
      });

      const bookUpdate = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          reservationId: newReservation.id,
        },
      });
      const resObject = { reservation: newReservation };
      return res.status(200).json(resObject);
    } else {
      const issue = rentalTrue && rental ? "rented" : "reserved";
      throw new Error(`Book with ID ${bookId} is already ${issue} by a user`);
      return res.status(400).json({ message: "book unavailable" });
    }
  } catch (error) {
    // Handle the error and send an error response
    console.error(error); // Log the error
    res.status(400).json({ error: error.message });
  }
}

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = Number(req.query.id);
  const userId = Number(req.query.userid);

  try {
    // Retrieve the rental record for the specific user
    const rental = await prisma.rentals.findUnique({
      where: {
        borrowerId: userId,
      },
      include: {
        booksOut: true,
      },
    });

    if (!rental) {
      // Handle the case where the rental record for the user doesn't exist
      const newRental = await prisma.rentals.create({
        data: {
          checkedOut: true,
          checkedOutAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          borrowerId: userId,
          booksOut: {
            connect: [{ id: bookId }],
          },
          booksOutId: [bookId],
        },
        include: {
          booksOut: true, // Include the booksOut relation in the response
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
      // Check if book is in rental
      const bookExists = rental.booksOut.some((book) => book.id === bookId);

      if (!bookExists) {
        // Update book rental
        const updatedBook = await prisma.book.update({
          where: {
            id: bookId,
          },
          data: { rentalId: rental.id },
        });

        // Add the book to the rental
        const updatedRental = await prisma.rentals.update({
          where: {
            borrowerId: userId,
          },
          data: {
            checkedOut: true,
            checkedOutAt: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            booksOut: {
              connect: {
                id: bookId,
              },
            },
            booksOutId: {
              push: bookId,
            },
          },
        });

        console.log("Updated book:", updatedBook);
        const resObject = { rental: updatedRental, update: updatedBook };
        return res.status(200).json(resObject);
      }
    }
  } catch (error) {
    console.error("Error updating book:", error);
    // Do error handling
    return res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}

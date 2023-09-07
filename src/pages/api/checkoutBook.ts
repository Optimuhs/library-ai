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
    const rental = await prisma.rentals.findFirst({
      where: {
        borrowerId: userId,
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
          borrowerId: userId,
          booksOutId: bookId,
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
      throw new Error(
        `Book with ID ${bookId} is already rented by user with ID ${userId}`
      );
    }
  } catch (error) {
    console.error("Error renting book:", error);
    // Do error handling
    return res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // Import your Prisma client

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bookId = Number(req.query.id);
    const reservingUserId = Number(req.query.userid);
    const bookIsbn = String(req.query.isbn);

    // Check if the book is available
    const book = await prisma.book.findFirst({
      where: {
        isbn: bookIsbn,
        rentalId: null,
        reservationId: null,
        id: bookId,
      },
    });
    if (book && reservingUserId) {
      const reserved = await prisma.reservation.create({
        data: {
          pending: true,
          reservationAt: new Date(),
          userId: reservingUserId,
          bookId: bookId,
          bookISBN: book.isbn,
        },
      });
      return res.status(200).json(reserved);
    }
  } catch (error) {
    // Handle the error and send an error response
    console.error(error); // Log the error
    res.status(400).json({ error: error.message });
  }
}

export default handler;

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = Number(req.query.userid);
  const book = req.query.isbn as string;
  const bookIsbn = book.trim();
  try {
    // Get User rental
    const rental = await prisma.rentals.findFirst({
      where: {
        borrowerId: userId,
        checkedOut: true,
        bookISBN: bookIsbn,
      },
    });

    if (rental != null) {
      // Update book
      const book = await prisma.book.update({
        where: {
          id: rental.booksOutId,
        },
        data: {
          rentalId: null,
          reservationId: null,
        },
      });

      const bookReturned = await prisma.rentals.update({
        where: {
          id: rental.id,
        },
        data: {
          checkedOut: false,
          checkedInAt: new Date(),
        },
      });

      const successResponse = { message: "Operation was successful" };
      return res.status(200).json(successResponse);
    } else {
      console.log(rental);
      throw Error("Rental does not exist");
    }
  } catch (error) {
    // Handle the error and send an error response
    console.error(error); // Log the error
    res.status(400).json({ error: error.message });
  }
}

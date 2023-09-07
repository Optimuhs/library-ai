import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookid = Number(req.query.bookid);
  const userId = Number(req.query.userId);

  try {
    const rental = await prisma.rentals.findFirst({
      where: {
        booksOutId: bookid,
        checkedOut: true,
      },
    });

    if (rental) {
      const updateRental = await prisma.rentals.update({
        where: {
          id: rental.id,
          borrowerId: rental.borrowerId,
        },
        data: {
          checkedOut: false,
          checkedInAt: new Date(),
        },
      });
      const successResponse = { message: "Operation was successful" };
      return res.status(200).json(successResponse);
    } else {
      return Error("Books is already checked in");
    }
  } catch (error) {
    console.error("Error updating book:", error);
  } finally {
    await prisma.$disconnect();
  }
}

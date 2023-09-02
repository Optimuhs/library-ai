import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  const userId = Number(req.query.userId);

  try {
    const updatedBook = await prisma.rentals.update({
      where: {
        id: id,
      },
      data: {},
    });
    console.log("Updated book:", updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
  } finally {
    await prisma.$disconnect();
  }
}

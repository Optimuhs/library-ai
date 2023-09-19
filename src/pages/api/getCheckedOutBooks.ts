import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = Number(req.query.userId);
    try {
      const data = await prisma.rentals.findMany({
        where: {
          borrowerId: userId,
          checkedOut: true,
        },
        include: {
          bookOut: true, // Include the associated book
        },
      });

      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

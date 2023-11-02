import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.book.findMany();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

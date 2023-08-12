import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const data = await prisma.user.findMany();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

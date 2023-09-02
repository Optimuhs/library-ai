import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    // const id = Number(req.query.id);
    const email = String(req.query.email);

    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

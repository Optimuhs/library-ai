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
    const { bookString } = req.query;

    if (typeof bookString === "string") {
      const isNumber = containsOnlyNumbers(bookString);
      // If isbn
      if (isNumber) {
        // const data = await prisma.book.findFirst({
        //   where: {
        //     isbn: bookString,
        //   },
        // });

        if (bookString.trim() !== "") {
          const data = await prisma.book.findMany({
            where: {
              isbn: {
                contains: bookString,
              },
            },
          });

          if (!data || data.length === 0) {
            return res.status(404).json({ error: "No matches found" });
          }

          return res.status(200).json(data);

          if (!data) {
            return res.status(404).json({ error: "Item not found" });
          }
        }
      }
      // Ensure defined
      if (bookString != "undefined") {
        // Fuzzy search for book titles
        if (bookString.trim() !== "") {
          const potentialMatches = await prisma.book.findMany({
            where: {
              title: {
                contains: bookString,
              },
              rentalId: null,
            },
          });

          if (!potentialMatches || potentialMatches.length === 0) {
            return res.status(404).json({ error: "No matches found" });
          }

          return res.status(200).json(potentialMatches);
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

function containsOnlyNumbers(inputString: string | undefined): boolean {
  if (inputString) {
    return /^[0-9]+$/.test(inputString);
  } else {
    return false;
  }
}

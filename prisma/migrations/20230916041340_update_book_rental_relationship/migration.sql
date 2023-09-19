/*
  Warnings:

  - A unique constraint covering the columns `[booksOutId]` on the table `rentals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_rentalId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "rentals_booksOutId_key" ON "rentals"("booksOutId");

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_booksOutId_fkey" FOREIGN KEY ("booksOutId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

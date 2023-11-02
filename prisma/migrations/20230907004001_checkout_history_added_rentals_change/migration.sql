/*
  Warnings:

  - A unique constraint covering the columns `[rentalId]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `booksOutId` on the `rentals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "booksOutId",
ADD COLUMN     "booksOutId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "checkout_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "checkoutDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_rentalId_key" ON "books"("rentalId");

-- AddForeignKey
ALTER TABLE "checkout_history" ADD CONSTRAINT "checkout_history_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_history" ADD CONSTRAINT "checkout_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Rentals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rentals" DROP CONSTRAINT "Rentals_borrowerId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_rentalId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- DropTable
DROP TABLE "Rentals";

-- CreateTable
CREATE TABLE "rentals" (
    "id" SERIAL NOT NULL,
    "checkedOut" BOOLEAN NOT NULL DEFAULT false,
    "checkedOutAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "checkedInAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "borrowerId" INTEGER NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rentals_borrowerId_key" ON "rentals"("borrowerId");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

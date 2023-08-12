/*
  Warnings:

  - You are about to drop the column `borrowerId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `checkedInAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `checkedOut` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `checkedOutAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `checkedOutById` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `reserved` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `checkedOutBooksId` on the `users` table. All the data in the column will be lost.
  - Added the required column `rentalId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_checkedOutById_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "borrowerId",
DROP COLUMN "checkedInAt",
DROP COLUMN "checkedOut",
DROP COLUMN "checkedOutAt",
DROP COLUMN "checkedOutById",
DROP COLUMN "dueDate",
DROP COLUMN "reserved",
ADD COLUMN     "rentalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "checkedOutBooksId",
ADD COLUMN     "checkedOutById" INTEGER;

-- CreateTable
CREATE TABLE "Rentals" (
    "id" SERIAL NOT NULL,
    "checkedOut" BOOLEAN NOT NULL,
    "checkedOutAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "checkedInAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "borrowerId" INTEGER NOT NULL,

    CONSTRAINT "Rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rentals_borrowerId_key" ON "Rentals"("borrowerId");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

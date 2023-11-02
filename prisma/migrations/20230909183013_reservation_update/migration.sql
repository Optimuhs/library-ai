/*
  Warnings:

  - Added the required column `bookISBN` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_reservationId_fkey";

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "bookISBN" TEXT NOT NULL;

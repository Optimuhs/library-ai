/*
  Warnings:

  - Added the required column `shelfLocation` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rentals" ALTER COLUMN "checkedOut" SET DEFAULT false;

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "shelfLocation" TEXT NOT NULL;

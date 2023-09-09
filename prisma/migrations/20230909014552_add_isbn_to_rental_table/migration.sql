/*
  Warnings:

  - Added the required column `bookISBN` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rentals" ADD COLUMN     "bookISBN" TEXT NOT NULL;

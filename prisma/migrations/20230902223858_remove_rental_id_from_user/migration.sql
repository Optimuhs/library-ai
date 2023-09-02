/*
  Warnings:

  - You are about to drop the column `rentalId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "rentalId";

ALTER TABLE "rentals" ADD COLUMN "booksOut" INT[];
/*
  Warnings:

  - You are about to drop the `checkout_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "checkout_history" DROP CONSTRAINT "checkout_history_bookId_fkey";

-- DropForeignKey
ALTER TABLE "checkout_history" DROP CONSTRAINT "checkout_history_userId_fkey";

-- DropIndex
DROP INDEX "rentals_borrowerId_key";

-- DropTable
DROP TABLE "checkout_history";

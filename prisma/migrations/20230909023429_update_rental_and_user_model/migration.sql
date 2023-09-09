/*
  Warnings:

  - Made the column `checkedOutAt` on table `rentals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueDate` on table `rentals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkedInAt` on table `rentals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_borrowerId_fkey";

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "checkedOutAt" SET NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL,
ALTER COLUMN "checkedInAt" SET NOT NULL;

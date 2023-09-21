-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_booksOutId_fkey";

-- DropIndex
DROP INDEX "rentals_booksOutId_key";

-- DropIndex
DROP INDEX "reservations_bookId_key";

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "checkedInAt" DROP NOT NULL,
ALTER COLUMN "checkedInAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

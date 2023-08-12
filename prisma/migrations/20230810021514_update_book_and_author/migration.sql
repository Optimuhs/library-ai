-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_rentalId_fkey";

-- DropIndex
DROP INDEX "books_isbn_key";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "rentalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

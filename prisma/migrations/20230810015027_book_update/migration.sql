/*
  Warnings:

  - Changed the type of `isbn` on the `books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "isbn",
ADD COLUMN     "isbn" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");

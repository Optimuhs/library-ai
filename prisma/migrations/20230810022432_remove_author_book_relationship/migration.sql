/*
  Warnings:

  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "authorId";

/*
  Warnings:

  - Added the required column `userId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

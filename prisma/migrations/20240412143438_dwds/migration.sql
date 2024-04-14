/*
  Warnings:

  - You are about to drop the column `lisenceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Lisence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LisenceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_lisenceId_fkey";

-- DropForeignKey
ALTER TABLE "_LisenceToUser" DROP CONSTRAINT "_LisenceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LisenceToUser" DROP CONSTRAINT "_LisenceToUser_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lisenceId";

-- DropTable
DROP TABLE "Lisence";

-- DropTable
DROP TABLE "_LisenceToUser";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HistoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToProduct_AB_unique" ON "_HistoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToProduct_B_index" ON "_HistoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "_HistoryToProduct" ADD CONSTRAINT "_HistoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToProduct" ADD CONSTRAINT "_HistoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `UserProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HistoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pay` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `History` table without a default value. This is not possible if the table is not empty.
  - Made the column `marketPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryToProduct" DROP CONSTRAINT "_HistoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryToProduct" DROP CONSTRAINT "_HistoryToProduct_B_fkey";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "change" INTEGER,
ADD COLUMN     "pay" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "marketPrice" SET NOT NULL;

-- DropTable
DROP TABLE "UserProduct";

-- DropTable
DROP TABLE "_HistoryToProduct";

-- CreateTable
CREATE TABLE "ProductHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "historyId" INTEGER NOT NULL,

    CONSTRAINT "ProductHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductHistory" ADD CONSTRAINT "ProductHistory_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

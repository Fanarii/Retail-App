/*
  Warnings:

  - You are about to drop the `ProductHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductHistory" DROP CONSTRAINT "ProductHistory_historyId_fkey";

-- DropTable
DROP TABLE "ProductHistory";

-- CreateTable
CREATE TABLE "HistoryProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "historyId" INTEGER,

    CONSTRAINT "HistoryProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoryProduct" ADD CONSTRAINT "HistoryProduct_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

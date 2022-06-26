/*
  Warnings:

  - You are about to alter the column `Price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `PriceWithUs` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `Price` INTEGER NOT NULL,
    MODIFY `PriceWithUs` INTEGER NOT NULL;

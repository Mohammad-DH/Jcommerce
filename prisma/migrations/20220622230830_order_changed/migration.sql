/*
  Warnings:

  - You are about to drop the column `User_Id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `UserId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_User_Id_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `User_Id`,
    ADD COLUMN `Status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

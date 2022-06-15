/*
  Warnings:

  - You are about to drop the column `Address_Id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `MainImage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Link]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ProductId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Link` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PriceWithUs` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_Product_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Gallery` DROP FOREIGN KEY `Gallery_Product_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_Address_Id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPack` DROP FOREIGN KEY `ProductPack_Cart_Id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPack` DROP FOREIGN KEY `ProductPack_Order_Id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPack` DROP FOREIGN KEY `ProductPack_Product_Id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPack` DROP FOREIGN KEY `ProductPack_Type_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_Product_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `Type` DROP FOREIGN KEY `Type_Product_Id_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToProduct` DROP FOREIGN KEY `_CategoryToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToProduct` DROP FOREIGN KEY `_CategoryToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `Address_Id`,
    DROP COLUMN `State`,
    ADD COLUMN `ProductId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `MainImage`,
    ADD COLUMN `CategoryId` INTEGER NOT NULL,
    ADD COLUMN `Image` VARCHAR(191) NOT NULL,
    ADD COLUMN `Link` VARCHAR(191) NOT NULL,
    ADD COLUMN `Price` VARCHAR(191) NOT NULL,
    ADD COLUMN `PriceWithUs` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `Comment`;

-- DropTable
DROP TABLE `Gallery`;

-- DropTable
DROP TABLE `ProductPack`;

-- DropTable
DROP TABLE `Rate`;

-- DropTable
DROP TABLE `Type`;

-- DropTable
DROP TABLE `_CategoryToProduct`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_Link_key` ON `Product`(`Link`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Category_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

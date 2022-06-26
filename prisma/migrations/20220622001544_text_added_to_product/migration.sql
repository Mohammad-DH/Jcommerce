/*
  Warnings:

  - Added the required column `Text` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `Text` VARCHAR(191) NOT NULL;

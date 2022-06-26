/*
  Warnings:

  - You are about to drop the column `Text` on the `Product` table. All the data in the column will be lost.
  - Added the required column `Followers` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Following` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Posts` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `Text`,
    ADD COLUMN `Followers` INTEGER NOT NULL,
    ADD COLUMN `Following` INTEGER NOT NULL,
    ADD COLUMN `Posts` INTEGER NOT NULL;

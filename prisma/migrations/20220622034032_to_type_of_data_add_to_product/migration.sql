/*
  Warnings:

  - Added the required column `NumericFollowers` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumericFollowing` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumericPosts` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `NumericFollowers` INTEGER NOT NULL,
    ADD COLUMN `NumericFollowing` INTEGER NOT NULL,
    ADD COLUMN `NumericPosts` INTEGER NOT NULL,
    MODIFY `Followers` VARCHAR(191) NOT NULL,
    MODIFY `Following` VARCHAR(191) NOT NULL,
    MODIFY `Posts` VARCHAR(191) NOT NULL;

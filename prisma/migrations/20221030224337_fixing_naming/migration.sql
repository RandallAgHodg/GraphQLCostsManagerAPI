/*
  Warnings:

  - The primary key for the `groupuser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `groupuser` table. All the data in the column will be lost.
  - Added the required column `UserId` to the `GroupUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `groupuser` DROP FOREIGN KEY `GroupUser_userId_fkey`;

-- AlterTable
ALTER TABLE `groupuser` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    ADD COLUMN `UserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`GroupId`, `UserId`);

-- AddForeignKey
ALTER TABLE `GroupUser` ADD CONSTRAINT `GroupUser_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `groupsId` on the `costs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `costs` DROP FOREIGN KEY `Costs_groupsId_fkey`;

-- AlterTable
ALTER TABLE `costs` DROP COLUMN `groupsId`,
    ADD COLUMN `GroupsId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Costs` ADD CONSTRAINT `Costs_GroupsId_fkey` FOREIGN KEY (`GroupsId`) REFERENCES `Groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

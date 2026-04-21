/*
  Warnings:

  - You are about to drop the column `subcommunityId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `name_comunity` on the `community` table. All the data in the column will be lost.
  - You are about to drop the `subcommunitys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCommunityId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameCommunity` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contet` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_subcommunityId_fkey`;

-- DropForeignKey
ALTER TABLE `subcommunitys` DROP FOREIGN KEY `SubCommunitys_communityId_fkey`;

-- AlterTable
ALTER TABLE `chat` DROP COLUMN `subcommunityId`,
    ADD COLUMN `subCommunityId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `community` DROP COLUMN `name_comunity`,
    ADD COLUMN `nameCommunity` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `messages` ADD COLUMN `contet` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `subcommunitys`;

-- CreateTable
CREATE TABLE `SubCommunity` (
    `SubCommunityId` INTEGER NOT NULL AUTO_INCREMENT,
    `communityId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SubCommunityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubCommunity` ADD CONSTRAINT `SubCommunity_communityId_fkey` FOREIGN KEY (`communityId`) REFERENCES `Community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_subCommunityId_fkey` FOREIGN KEY (`subCommunityId`) REFERENCES `SubCommunity`(`SubCommunityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

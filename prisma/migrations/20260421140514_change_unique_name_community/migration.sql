/*
  Warnings:

  - A unique constraint covering the columns `[nameCommunity]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Community_nameCommunity_key` ON `Community`(`nameCommunity`);

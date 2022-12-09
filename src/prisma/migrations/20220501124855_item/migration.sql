-- AlterTable
ALTER TABLE `Post` ADD COLUMN `thumbnailId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

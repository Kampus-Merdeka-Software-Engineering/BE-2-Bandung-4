/*
  Warnings:

  - You are about to alter the column `phone` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `teleponPelanggan` on the `Pemesanan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `phone` INTEGER NOT NULL,
    MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Pemesanan` MODIFY `teleponPelanggan` INTEGER NOT NULL;

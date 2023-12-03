-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaPelanggan` VARCHAR(191) NOT NULL,
    `emailPelanggan` VARCHAR(191) NOT NULL,
    `teleponPelanggan` VARCHAR(191) NOT NULL,
    `idProduk` INTEGER NOT NULL,
    `jumlahTiket` INTEGER NOT NULL,
    `kodeTiket` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_idProduk_fkey` FOREIGN KEY (`idProduk`) REFERENCES `Produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

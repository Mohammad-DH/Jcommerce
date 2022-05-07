-- CreateTable
CREATE TABLE `User` (
    `User_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NULL,
    `Admin` BOOLEAN NOT NULL DEFAULT false,
    `Code` VARCHAR(191) NULL,

    UNIQUE INDEX `User_User_Id_key`(`User_Id`),
    UNIQUE INDEX `User_PhoneNumber_key`(`PhoneNumber`),
    PRIMARY KEY (`User_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `Address_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FullAddress` VARCHAR(191) NOT NULL,
    `PostNumber` VARCHAR(191) NOT NULL,
    `User_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Address_Address_Id_key`(`Address_Id`),
    PRIMARY KEY (`Address_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `Product_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `MainImage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_Product_Id_key`(`Product_Id`),
    UNIQUE INDEX `Product_Name_key`(`Name`),
    PRIMARY KEY (`Product_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate` (
    `Rate_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Rate` INTEGER NOT NULL,
    `Product_Id` INTEGER NOT NULL,
    `User_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Rate_Rate_Id_key`(`Rate_Id`),
    PRIMARY KEY (`Rate_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallery` (
    `Gallery_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Image` VARCHAR(191) NOT NULL,
    `Product_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Gallery_Gallery_Id_key`(`Gallery_Id`),
    UNIQUE INDEX `Gallery_Image_key`(`Image`),
    PRIMARY KEY (`Gallery_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `Type_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Color` VARCHAR(191) NOT NULL,
    `Price` VARCHAR(191) NOT NULL,
    `Inventory` INTEGER NOT NULL,
    `Product_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Type_Type_Id_key`(`Type_Id`),
    PRIMARY KEY (`Type_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `Category_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_Category_Id_key`(`Category_Id`),
    PRIMARY KEY (`Category_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `Order_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Address_Id` INTEGER NOT NULL,
    `User_Id` INTEGER NOT NULL,
    `State` VARCHAR(191) NOT NULL DEFAULT 'waiting',

    UNIQUE INDEX `Order_Order_Id_key`(`Order_Id`),
    PRIMARY KEY (`Order_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPack` (
    `ProductPack_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Count` INTEGER NOT NULL,
    `Type_Id` INTEGER NOT NULL,
    `Product_Id` INTEGER NOT NULL,
    `Order_Id` INTEGER NOT NULL,
    `Cart_Id` INTEGER NOT NULL,

    UNIQUE INDEX `ProductPack_ProductPack_Id_key`(`ProductPack_Id`),
    PRIMARY KEY (`ProductPack_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `Comment_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Like` INTEGER NOT NULL,
    `Product_Id` INTEGER NOT NULL,
    `User_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Comment_Comment_Id_key`(`Comment_Id`),
    PRIMARY KEY (`Comment_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `Cart_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_Id` INTEGER NOT NULL,

    UNIQUE INDEX `Cart_Cart_Id_key`(`Cart_Id`),
    UNIQUE INDEX `Cart_User_Id_key`(`User_Id`),
    PRIMARY KEY (`Cart_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToProduct_AB_unique`(`A`, `B`),
    INDEX `_CategoryToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Type` ADD CONSTRAINT `Type_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Address_Id_fkey` FOREIGN KEY (`Address_Id`) REFERENCES `Address`(`Address_Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPack` ADD CONSTRAINT `ProductPack_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPack` ADD CONSTRAINT `ProductPack_Type_Id_fkey` FOREIGN KEY (`Type_Id`) REFERENCES `Type`(`Type_Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPack` ADD CONSTRAINT `ProductPack_Order_Id_fkey` FOREIGN KEY (`Order_Id`) REFERENCES `Order`(`Order_Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPack` ADD CONSTRAINT `ProductPack_Cart_Id_fkey` FOREIGN KEY (`Cart_Id`) REFERENCES `Cart`(`Cart_Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToProduct` ADD CONSTRAINT `_CategoryToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`Category_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToProduct` ADD CONSTRAINT `_CategoryToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`Product_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

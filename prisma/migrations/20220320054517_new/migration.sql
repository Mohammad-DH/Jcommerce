BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [User_Id] INT NOT NULL IDENTITY(1,1),
    [FirstName] NVARCHAR(1000) NOT NULL,
    [LastName] NVARCHAR(1000) NOT NULL,
    [PhoneNumber] NVARCHAR(1000) NOT NULL,
    [Email] NVARCHAR(1000) NOT NULL,
    [Admin] BIT NOT NULL CONSTRAINT [User_Admin_df] DEFAULT 0,
    [Code] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([User_Id]),
    CONSTRAINT [User_User_Id_key] UNIQUE ([User_Id]),
    CONSTRAINT [User_PhoneNumber_key] UNIQUE ([PhoneNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Address] (
    [Address_Id] INT NOT NULL IDENTITY(1,1),
    [FullAddress] NVARCHAR(1000) NOT NULL,
    [PostNumber] NVARCHAR(1000) NOT NULL,
    [User_Id] INT NOT NULL,
    CONSTRAINT [Address_pkey] PRIMARY KEY ([Address_Id]),
    CONSTRAINT [Address_Address_Id_key] UNIQUE ([Address_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [Product_Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [MainImage] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY ([Product_Id]),
    CONSTRAINT [Product_Product_Id_key] UNIQUE ([Product_Id]),
    CONSTRAINT [Product_Name_key] UNIQUE ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[Rate] (
    [Rate_Id] INT NOT NULL IDENTITY(1,1),
    [Rate] INT NOT NULL,
    [Product_Id] INT NOT NULL,
    [User_Id] INT NOT NULL,
    CONSTRAINT [Rate_pkey] PRIMARY KEY ([Rate_Id]),
    CONSTRAINT [Rate_Rate_Id_key] UNIQUE ([Rate_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Gallery] (
    [Gallery_Id] INT NOT NULL IDENTITY(1,1),
    [Image] NVARCHAR(1000) NOT NULL,
    [Product_Id] INT NOT NULL,
    CONSTRAINT [Gallery_pkey] PRIMARY KEY ([Gallery_Id]),
    CONSTRAINT [Gallery_Gallery_Id_key] UNIQUE ([Gallery_Id]),
    CONSTRAINT [Gallery_Image_key] UNIQUE ([Image])
);

-- CreateTable
CREATE TABLE [dbo].[Type] (
    [Type_Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Color] NVARCHAR(1000) NOT NULL,
    [Price] NVARCHAR(1000) NOT NULL,
    [Inventory] INT NOT NULL,
    [Product_Id] INT NOT NULL,
    CONSTRAINT [Type_pkey] PRIMARY KEY ([Type_Id]),
    CONSTRAINT [Type_Type_Id_key] UNIQUE ([Type_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [Category_Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Image] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY ([Category_Id]),
    CONSTRAINT [Category_Category_Id_key] UNIQUE ([Category_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [Order_Id] INT NOT NULL IDENTITY(1,1),
    [Address_Id] INT NOT NULL,
    [User_Id] INT NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY ([Order_Id]),
    CONSTRAINT [Order_Order_Id_key] UNIQUE ([Order_Id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductPack] (
    [ProductPack_Id] INT NOT NULL IDENTITY(1,1),
    [Count] INT NOT NULL,
    [Type_Id] INT NOT NULL,
    [Product_Id] INT NOT NULL,
    [Order_Id] INT NOT NULL,
    [Cart_Id] INT NOT NULL,
    CONSTRAINT [ProductPack_pkey] PRIMARY KEY ([ProductPack_Id]),
    CONSTRAINT [ProductPack_ProductPack_Id_key] UNIQUE ([ProductPack_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [Comment_Id] INT NOT NULL IDENTITY(1,1),
    [Like] INT NOT NULL,
    [Product_Id] INT NOT NULL,
    [User_Id] INT NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY ([Comment_Id]),
    CONSTRAINT [Comment_Comment_Id_key] UNIQUE ([Comment_Id])
);

-- CreateTable
CREATE TABLE [dbo].[Cart] (
    [Cart_Id] INT NOT NULL IDENTITY(1,1),
    [User_Id] INT NOT NULL,
    CONSTRAINT [Cart_pkey] PRIMARY KEY ([Cart_Id]),
    CONSTRAINT [Cart_Cart_Id_key] UNIQUE ([Cart_Id]),
    CONSTRAINT [Cart_User_Id_key] UNIQUE ([User_Id])
);

-- CreateTable
CREATE TABLE [dbo].[_CategoryToProduct] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_CategoryToProduct_AB_unique] UNIQUE ([A],[B])
);

-- CreateIndex
CREATE INDEX [_CategoryToProduct_B_index] ON [dbo].[_CategoryToProduct]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Address] ADD CONSTRAINT [Address_User_Id_fkey] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User]([User_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_User_Id_fkey] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User]([User_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_Product_Id_fkey] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Gallery] ADD CONSTRAINT [Gallery_Product_Id_fkey] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Type] ADD CONSTRAINT [Type_Product_Id_fkey] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_User_Id_fkey] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User]([User_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_Address_Id_fkey] FOREIGN KEY ([Address_Id]) REFERENCES [dbo].[Address]([Address_Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductPack] ADD CONSTRAINT [ProductPack_Product_Id_fkey] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductPack] ADD CONSTRAINT [ProductPack_Type_Id_fkey] FOREIGN KEY ([Type_Id]) REFERENCES [dbo].[Type]([Type_Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductPack] ADD CONSTRAINT [ProductPack_Order_Id_fkey] FOREIGN KEY ([Order_Id]) REFERENCES [dbo].[Order]([Order_Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductPack] ADD CONSTRAINT [ProductPack_Cart_Id_fkey] FOREIGN KEY ([Cart_Id]) REFERENCES [dbo].[Cart]([Cart_Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_User_Id_fkey] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User]([User_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_Product_Id_fkey] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cart] ADD CONSTRAINT [Cart_User_Id_fkey] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User]([User_Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CategoryToProduct] ADD CONSTRAINT [FK___CategoryToProduct__A] FOREIGN KEY ([A]) REFERENCES [dbo].[Category]([Category_Id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CategoryToProduct] ADD CONSTRAINT [FK___CategoryToProduct__B] FOREIGN KEY ([B]) REFERENCES [dbo].[Product]([Product_Id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

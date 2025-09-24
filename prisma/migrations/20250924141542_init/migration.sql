-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `processId` INTEGER NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_employeeId_key`(`employeeId`),
    UNIQUE INDEX `user_alias_key`(`alias`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `process` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `process_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `processId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `holiday` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `holiday_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL DEFAULT 1,
    `isLate` BOOLEAN NOT NULL DEFAULT false,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appliance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `makeOfAppliance` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `leadId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `centre` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `processId` INTEGER NULL,
    `planId` INTEGER NULL,
    `closerId` INTEGER NULL,
    `fee` INTEGER NULL,
    `currency` VARCHAR(191) NULL,
    `bankName` VARCHAR(191) NULL,
    `accountName` VARCHAR(191) NULL,
    `sort` VARCHAR(191) NULL,
    `statusId` INTEGER NULL DEFAULT 1,
    `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accountNumber` VARCHAR(191) NULL,
    `cardBankName` VARCHAR(191) NULL,
    `cardCvv` VARCHAR(191) NULL,
    `cardName` VARCHAR(191) NULL,
    `cardNumber` VARCHAR(191) NULL,
    `county` VARCHAR(191) NULL,
    `expiry` VARCHAR(191) NULL,
    `shift` VARCHAR(191) NULL,
    `leadByUserId` INTEGER NULL,
    `verifierId` INTEGER NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `poa` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `saleDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leadcount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL DEFAULT 0,
    `date` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `leadcount_date_month_year_userId_key`(`date`, `month`, `year`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_change_reason` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `leadId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fromStatus` VARCHAR(191) NULL,
    `toStatus` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `old_users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(191) NULL,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NULL,
    `email_verified_at` TIMESTAMP(0) NULL,
    `email_otp` VARCHAR(10) NULL,
    `designation` VARCHAR(150) NULL,
    `gender` VARCHAR(20) NULL,
    `address` VARCHAR(300) NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `pin` VARCHAR(20) NULL,
    `pan` VARCHAR(20) NULL,
    `pic` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(30) NOT NULL DEFAULT 'Superadmin',
    `phone` VARCHAR(20) NULL,
    `join_at` DATE NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `users_email_index`(`email`),
    INDEX `users_phone_index`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `old_leads` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `sale_at` DATE NULL,
    `salutation` VARCHAR(20) NULL,
    `closer_user_id` BIGINT UNSIGNED NULL,
    `fname` VARCHAR(191) NOT NULL,
    `mname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NULL,
    `address1` MEDIUMTEXT NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `pin` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `dob` DATE NULL,
    `phone` VARCHAR(191) NULL,
    `process` VARCHAR(191) NULL,
    `plan` VARCHAR(191) NULL,
    `fee` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `bank_name` VARCHAR(191) NULL,
    `account_name` VARCHAR(191) NULL,
    `account_no` VARCHAR(191) NULL,
    `sort_code` VARCHAR(191) NULL,
    `card_no` VARCHAR(191) NULL,
    `card_type` VARCHAR(191) NULL,
    `expiry_month` INTEGER NULL,
    `expiry_year` INTEGER NULL,
    `card_cvv` VARCHAR(10) NULL,
    `comments` TEXT NULL,
    `centre` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `leads_closer_user_id_foreign`(`closer_user_id`),
    INDEX `leads_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_forms` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `agent_name` VARCHAR(255) NULL,
    `agent_id` VARCHAR(100) NULL,
    `sale_date` DATE NULL,
    `closer_name` VARCHAR(255) NULL,
    `cust_title` VARCHAR(255) NULL,
    `cust_first_name` VARCHAR(255) NULL,
    `cust_middle_name` VARCHAR(255) NULL,
    `cust_last_name` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `pincode` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `dob` DATE NULL,
    `process` VARCHAR(255) NULL,
    `plan` VARCHAR(255) NULL,
    `plan_fee` VARCHAR(255) NULL,
    `name_of_bank` VARCHAR(255) NULL,
    `account_name` VARCHAR(255) NULL,
    `account_number` VARCHAR(255) NULL,
    `sort_code` VARCHAR(255) NULL,
    `appliance` VARCHAR(255) NULL,
    `make_of_appliance` VARCHAR(255) NULL,
    `age` VARCHAR(255) NULL,
    `card_number` VARCHAR(255) NULL,
    `cardType` VARCHAR(100) NULL,
    `expMonth` VARCHAR(100) NULL,
    `expYear` INTEGER NULL,
    `card_cvv_number` VARCHAR(255) NULL,
    `comment` TEXT NULL,
    `product_details` TEXT NULL,
    `deleted_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_processId_fkey` FOREIGN KEY (`processId`) REFERENCES `process`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan` ADD CONSTRAINT `plan_processId_fkey` FOREIGN KEY (`processId`) REFERENCES `process`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appliance` ADD CONSTRAINT `appliance_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_closerId_fkey` FOREIGN KEY (`closerId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_leadByUserId_fkey` FOREIGN KEY (`leadByUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_processId_fkey` FOREIGN KEY (`processId`) REFERENCES `process`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `lead_verifierId_fkey` FOREIGN KEY (`verifierId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leadcount` ADD CONSTRAINT `leadcount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status_change_reason` ADD CONSTRAINT `status_change_reason_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status_change_reason` ADD CONSTRAINT `status_change_reason_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `old_leads` ADD CONSTRAINT `leads_closer_user_id_foreign` FOREIGN KEY (`closer_user_id`) REFERENCES `old_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `old_leads` ADD CONSTRAINT `leads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `old_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

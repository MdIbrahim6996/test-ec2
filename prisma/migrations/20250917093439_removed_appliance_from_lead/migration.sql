/*
  Warnings:

  - You are about to drop the column `applianceId` on the `Lead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Lead" DROP CONSTRAINT "Lead_applianceId_fkey";

-- AlterTable
ALTER TABLE "public"."Lead" DROP COLUMN "applianceId";

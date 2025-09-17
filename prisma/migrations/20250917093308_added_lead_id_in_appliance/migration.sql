/*
  Warnings:

  - Added the required column `leadId` to the `Appliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Appliance" ADD COLUMN     "leadId" INTEGER NOT NULL;

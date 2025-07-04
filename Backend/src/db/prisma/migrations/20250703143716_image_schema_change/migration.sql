/*
  Warnings:

  - Added the required column `profileImage` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImage",
ADD COLUMN     "profileImage" BYTEA NOT NULL;

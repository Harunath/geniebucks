-- CreateEnum
CREATE TYPE "GenderTypes" AS ENUM ('Male', 'Female', 'Other', 'PreferNotToSay');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "GenderTypes" NOT NULL DEFAULT 'PreferNotToSay';

-- CreateEnum
CREATE TYPE "EmiStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "ProfessionTypes" AS ENUM ('Employed', 'SelfEmployed', 'Business', 'Student', 'Retired', 'Unemployed');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profession" "ProfessionTypes" NOT NULL DEFAULT 'Unemployed',
ADD COLUMN     "setSpendLimit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "spendingLimit" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Emis" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "to" TEXT,
    "for" TEXT NOT NULL,
    "status" "EmiStatus" NOT NULL DEFAULT 'PENDING',
    "installmentNumber" INTEGER,
    "totalInstallments" INTEGER,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "Emis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Emis_dueDate_idx" ON "Emis"("dueDate");

-- CreateIndex
CREATE INDEX "Emis_userId_idx" ON "Emis"("userId");

-- AddForeignKey
ALTER TABLE "Emis" ADD CONSTRAINT "Emis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The `status` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'INPROGRESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'TODO';

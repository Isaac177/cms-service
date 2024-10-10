/*
  Warnings:

  - Added the required column `image` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "image" TEXT NOT NULL;

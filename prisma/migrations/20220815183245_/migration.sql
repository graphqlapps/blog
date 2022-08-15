/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "postContentId" TEXT;

-- CreateTable
CREATE TABLE "PostContent" (
    "id" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,

    CONSTRAINT "PostContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postContentId_fkey" FOREIGN KEY ("postContentId") REFERENCES "PostContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

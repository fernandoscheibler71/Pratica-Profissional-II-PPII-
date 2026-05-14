-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "nameCommunity" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL DEFAULT 'url',

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCommunity" (
    "SubCommunityId" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCommunity_pkey" PRIMARY KEY ("SubCommunityId")
);

-- CreateTable
CREATE TABLE "members_community" (
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "members_community_pkey" PRIMARY KEY ("userId","communityId")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "subCommunityId" INTEGER NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contet" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Community_nameCommunity_key" ON "Community"("nameCommunity");

-- AddForeignKey
ALTER TABLE "SubCommunity" ADD CONSTRAINT "SubCommunity_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_community" ADD CONSTRAINT "members_community_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_community" ADD CONSTRAINT "members_community_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_subCommunityId_fkey" FOREIGN KEY ("subCommunityId") REFERENCES "SubCommunity"("SubCommunityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

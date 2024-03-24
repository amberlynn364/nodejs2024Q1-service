-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteAlbum" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_id_key" ON "FavoriteArtist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_id_key" ON "FavoriteAlbum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_id_key" ON "FavoriteTrack"("id");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_id_fkey" FOREIGN KEY ("id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_id_fkey" FOREIGN KEY ("id") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_id_fkey" FOREIGN KEY ("id") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

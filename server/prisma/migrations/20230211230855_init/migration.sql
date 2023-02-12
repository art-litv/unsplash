-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

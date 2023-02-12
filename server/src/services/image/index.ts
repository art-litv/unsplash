import type { Image } from '@prisma/client';

import type ImageDto from './dto';
import prisma from '../../configs/prisma';

export const getImages = (label = ''): Promise<Image[]> => {
  return prisma.image.findMany({
    where: {
      label: {
        contains: label
      }
    }
  });
};

export const createImage = async (imageDto: ImageDto): Promise<Image> => {
  return prisma.image.create({
    data: { ...imageDto }
  });
};

export const deleteImage = async (imageId: Image['id']): Promise<Image> => {
  return prisma.image.delete({
    where: {
      id: imageId
    }
  });
};

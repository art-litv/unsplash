import express from 'express';

import * as ImageService from '../../services/image';

const router = express.Router();

router.get('/', async (req, res) => {
  const images = await ImageService.getImages(req.query.label as string);
  res.json(images);
});

router.post('/', async (req, res) => {
  const image = await ImageService.createImage(req.body);
  res.json(image);
});

router.delete('/:imageId', async (req, res) => {
  const image = await ImageService.deleteImage(+req.params.imageId);
  res.json(image);
});

export const BASE_URL = '/images';

export default router;

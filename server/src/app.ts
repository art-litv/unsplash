import express from 'express';
import cors from 'cors';

import ImageRouter, { BASE_URL } from './controllers/image';
import prisma from './configs/prisma';

const app = express();

// Third-party middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(BASE_URL, ImageRouter);

app.listen(3000);

process.on('SIGINT', async function () {
  await prisma.$disconnect();
  process.exit();
});

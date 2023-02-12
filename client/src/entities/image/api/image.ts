import api from '@/shared/api';

import type { Image } from '../model/image';
import type { AddImageDto } from './dto';
import axios from 'axios';

export default {
  getAll: {
    key: 'images',
    // TODO
    fetcher: async (): Promise<Image[]> => {
      const { data } = await api.get('/images');
      return data;
    }
  },
  create: {
    fetcher: async (dto: AddImageDto): Promise<Image> => {
      const { data } = await api.post('/images', dto, {
        headers: { 'Content-Type': 'application/json' }
      });
      return data;
    }
  },
  delete: {
    fetcher: async (id: Image['id']): Promise<void> => {
      await api.delete(`/images/${id}`);
    }
  }
} as const;

import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import { Image as MantineImage, Card, Text, ActionIcon } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import type { Image } from '../model/image';

type ImageCardProps = {
  image: Image;
  onDelete?: (imageId: number) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  const { href, label } = image;
  const { hovered, ref } = useHover();

  return (
    <Card ref={ref} shadow="sm" p="lg" radius="md" className="group">
      <Card.Section>
        <MantineImage
          src={href}
          radius="sm"
          imageProps={hovered ? { style: { filter: 'blur(2px) brightness(0.75)' } } : undefined}
        />
        <div className="transition-opacity opacity-0 group-hover:opacity-100">
          {onDelete && (
            <ActionIcon
              onClick={() => onDelete(image.id)}
              size="lg"
              color="red"
              variant="transparent"
              className="absolute top-3 right-3">
              <IconTrash size={26} />
            </ActionIcon>
          )}
          <Text color="#fff" p="md" className="absolute bottom-0">
            {label}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
};

export default ImageCard;

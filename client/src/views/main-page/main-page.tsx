import React, { useEffect, useState } from 'react';
import { IconAlertCircle, IconPlus, IconSearch } from '@tabler/icons-react';
import {
  Affix,
  Alert,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
  Transition
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInputState } from '@mantine/hooks';

import { ImageCard, ImageApi, ImageModel } from '@/entities/image';

function splitArray(array: unknown[], numOfArrays: number) {
  let subArrays = [];
  for (let i = 0; i < numOfArrays; i++) {
    subArrays.push([]);
  }

  for (let i = 0; i < array.length; i++) {
    subArrays[i % numOfArrays].push(array[i] as never);
  }

  return subArrays;
}

const MainPage: React.FC = (props) => {
  const [opened, setOpened] = useState(false);
  const [searchLabel, setSearchLabel] = useInputState('');
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: images
  } = useQuery({
    queryKey: [ImageApi.getAll.key],
    queryFn: ImageApi.getAll.fetcher
  });

  const deleteMutation = useMutation({
    mutationFn: ImageApi.delete.fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries([ImageApi.getAll.key]);
    }
  });

  const createMutation = useMutation({
    mutationFn: ImageApi.create.fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries([ImageApi.getAll.key]);
    }
  });

  useEffect(() => {
    if (createMutation.isSuccess) {
      setOpened(false);
    }
  }, [createMutation.isLoading]);

  if (isLoading || error) {
    return null;
  }

  const filteredImages = (images as ImageModel.Image[]).filter((image: ImageModel.Image) =>
    image.label.toLowerCase().includes(searchLabel.toLowerCase())
  );

  const imagesCols = splitArray(filteredImages, 3);

  return (
    <div className="container mx-auto xl:px-64">
      <Affix position={{ bottom: 40, right: 40 }}>
        <Transition transition="slide-up" mounted={!!createMutation.error}>
          {(styles) => (
            <div style={styles}>
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Could not create image"
                color="red"
                withCloseButton>
                Something terrible happened! You made a mistake and there is no going back, your
                data was lost forever!
              </Alert>
            </div>
          )}
        </Transition>
      </Affix>
      <Modal
        overlayOpacity={0.5}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new photo">
        <form
          onSubmit={(e) => {
            // todo get form values from e.target
            e.preventDefault();
            const formValues = new FormData(e.target as HTMLFormElement);
            createMutation.mutate({
              label: formValues.get('label') as string,
              href: formValues.get('href') as string
            });
          }}
          className="position-relative">
          <LoadingOverlay visible={createMutation.isLoading} overlayBlur={2} />
          <Stack spacing={8}>
            <TextInput name="label" label="Label" placeholder="A beatiful photo" required />
            <TextInput
              name="href"
              label="Photo URL"
              placeholder="https://mybeatifulphotos.com/photo.png"
              required
            />
          </Stack>
          <Group className="mt-8 justify-end" spacing={8}>
            <Button color="gray" variant="subtle" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="green">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <header className="flex justify-between pt-4 pb-12">
        <TextInput
          value={searchLabel}
          onChange={setSearchLabel}
          placeholder="Search by name"
          icon={<IconSearch size={18} />}
        />
        <Button onClick={() => setOpened(true)} color="green" leftIcon={<IconPlus />}>
          Add a photo
        </Button>
      </header>
      <main>
        <Grid>
          {imagesCols.map((colImages, index) => (
            <Grid.Col span={4} key={`col-${index}`}>
              <Stack>
                {(colImages as ImageModel.Image[]).map((image) => (
                  <ImageCard
                    image={image}
                    onDelete={async (imageId) => {
                      await deleteMutation.mutate(imageId);
                    }}
                  />
                ))}
              </Stack>
            </Grid.Col>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default MainPage;

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

import { MainPage } from '@/views/main-page';

import './styles/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <MainPage />
    </MantineProvider>
  </QueryClientProvider>
);

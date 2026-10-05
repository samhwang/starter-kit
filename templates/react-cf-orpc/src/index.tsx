import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

async function renderRoot() {
  if (import.meta.env.DEV) {
    const { network } = await import('virtual:msw');
    const { handlers } = await import('../__mocks__/msw/handlers');
    network.configure({ handlers });
    await network.enable();
  }

  const RootComponent = (
    <StrictMode>
      <App />
    </StrictMode>
  );

  const rootElement = document.getElementById('root') as HTMLElement;
  const root = createRoot(rootElement);
  root.render(RootComponent);
}

void renderRoot();

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import '../__mocks__/msw/setup';

afterEach(() => {
  cleanup();
});

vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null,
}));

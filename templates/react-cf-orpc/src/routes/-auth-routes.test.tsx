import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null,
}));

import { server } from '../../__mocks__/msw/server';
import { routeTree } from '../routeTree.gen';

function renderRoute(initialPath: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });

  return render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

describe('auth routes', () => {
  it('redirects unauthenticated users from dashboard to login', async () => {
    server.use(
      http.all('*/api/auth/get-session', () => {
        return HttpResponse.json(null);
      })
    );

    renderRoute('/dashboard');

    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders the login form', async () => {
    renderRoute('/login');

    expect(await screen.findByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});

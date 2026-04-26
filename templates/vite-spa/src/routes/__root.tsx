import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';

const queryClient = new QueryClient();

function NotFoundComponent() {
  return <h1>Not Found</h1>;
}

export function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <TanStackDevtools
          plugins={[              {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
          formDevtoolsPlugin(),]}
          />
        </body>
      </html>
    </QueryClientProvider>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    links: [{ rel: 'icon', href: '/favicon.svg' }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

import { http } from 'msw/http';
import { passthrough } from 'msw/utils/passthrough';

export const handlers = [
  // For TanStack devtools
  http.all('/__tsd/*', () => {
    return passthrough();
  }),

  // Local API
  http.all('/api/*', () => {
    return passthrough();
  }),

  http.get('/test', ({ request, params, cookies }) => {
    console.log({ request, params, cookies });
    return new Response(null, { status: 200 });
  }),
];

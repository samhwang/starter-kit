import { http } from 'msw/http';
import { passthrough } from 'msw/utils/passthrough';

export const handlers = [
  http.all('http://localhost:5173/*', () => {
    return passthrough();
  }),
  http.get('/test', ({ request, params, cookies }) => {
    console.log({ request, params, cookies });
    return new Response(null, { status: 200 });
  }),
];

import { http, passthrough } from 'msw';

export const handlers = [
  http.all('http://localhost:5173/*', () => {
    return passthrough()
  }),
  http.get('/test', ({ request, params, cookies }) => {
    console.log({ request, params, cookies });
    return new Response(null, { status: 200 });
  }),
];

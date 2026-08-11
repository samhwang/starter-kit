import { createORPCClient, onError } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import type { appRouter } from '../server/orpc/router';

const link = new RPCLink({
  url: () => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot create RPC client in server environment');
    }

    const host = window.location.host;
    const protocol = window.location.protocol;
    return `${protocol}//${host}/api/rpc`;
  },
  interceptors: [
    onError((error) => {
      console.error('RPC error:', error);
    }),
  ],
});

export const client: RouterClient<typeof appRouter> = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);

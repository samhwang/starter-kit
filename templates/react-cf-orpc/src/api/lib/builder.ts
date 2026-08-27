import { os } from '@orpc/server';

import type { HonoOrpcContext } from './context';

const o = os.$context<HonoOrpcContext>();

export const publicProcedure = o;

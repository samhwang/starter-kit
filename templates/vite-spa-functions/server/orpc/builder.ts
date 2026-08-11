import { os } from '@orpc/server';
import type { HonoContext } from '../context';

const o = os.$context<HonoContext>();

export const publicProcedure = o;

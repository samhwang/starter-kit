import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '../auth/client';
import { DashboardPage } from '../dashboard/pages';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardPage,
});

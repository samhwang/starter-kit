import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import { authClient } from '../auth/client';
import { orpc } from '../orpc';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { data: user } = useQuery(orpc.user.me.queryOptions());

  return (
    <main>
      <h1>Dashboard</h1>
      {user && <p>Signed in as {user.email}</p>}

      <button
        type="button"
        onClick={async () => {
          await authClient.signOut();
          await navigate({ to: '/' });
        }}
      >
        Sign out
      </button>
    </main>
  );
}

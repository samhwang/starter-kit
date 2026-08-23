import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { authClient } from '../auth/client';
import { auth } from '../auth/server';

const getSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  if (!session) return null;
  return {
    id: session.user.id,
    email: session.user.email,
  };
});

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: '/login' });
    }
    return { session };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const user = session?.user;

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

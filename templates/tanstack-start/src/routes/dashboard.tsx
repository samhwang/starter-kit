import { createFileRoute, redirect } from '@tanstack/react-router';
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
    role: session.user.role as string,
    isActive: session.user.isActive as boolean,
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
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
      {user && <p className="mt-2 text-stone-600">Signed in as {user.email}</p>}

      <button type="button" className="mt-6 rounded-lg bg-stone-800 px-4 py-2 text-white hover:bg-stone-700" onClick={() => void authClient.signOut()}>
        Sign out
      </button>
    </main>
  );
}

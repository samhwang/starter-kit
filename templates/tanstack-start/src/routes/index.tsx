import { createFileRoute, Link } from '@tanstack/react-router';

import { authClient } from '../auth/client';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: session } = authClient.useSession();
  const { clientEnv } = Route.useRouteContext();
  const user = session?.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-stone-800">{clientEnv.SITE_NAME}</h1>
      <p className="mt-2 text-stone-600">A TanStack Start + Better Auth starter template.</p>

      {user ? (
        <p className="mt-8 text-stone-600">
          Signed in as <strong>{user.email}</strong>.{' '}
          <Link to="/dashboard" className="text-amber-700 underline hover:text-amber-800">
            Go to dashboard
          </Link>
        </p>
      ) : (
        <p className="mt-8 text-stone-600">
          <Link to="/login" className="text-amber-700 underline hover:text-amber-800">
            Sign in
          </Link>{' '}
          or{' '}
          <Link to="/register" className="text-amber-700 underline hover:text-amber-800">
            create an account
          </Link>
          .
        </p>
      )}
    </main>
  );
}

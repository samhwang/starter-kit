import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import * as z from 'zod';

import { authClient } from '../auth/client';
import { useAuthForm } from '../auth/hooks/useAuthForm';

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useAuthForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      if (error) {
        setError(error.message ?? 'Sign in failed');
        return;
      }
      await navigate({ to: '/dashboard' });
    },
  });

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold text-stone-800">Sign in</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name="email">{(field) => <field.AuthField label="Email" type="email" placeholder="you@example.com" />}</form.AppField>
        <form.AppField name="password">{(field) => <field.AuthField label="Password" type="password" placeholder="••••••••" />}</form.AppField>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={form.state.isSubmitting}
          className="w-full rounded-lg bg-stone-800 py-2 text-white hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

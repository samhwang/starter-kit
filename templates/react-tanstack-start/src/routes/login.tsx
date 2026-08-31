import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '../auth/pages/login';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

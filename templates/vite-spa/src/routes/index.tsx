import { createFileRoute } from '@tanstack/react-router';

export function IndexPage() {
  return <h1>Hi.</h1>;
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});

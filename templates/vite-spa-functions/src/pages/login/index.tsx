import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { authClient } from '../../../server/auth/client';

const signinSchema = z.object({
  username: z.email(),
  password: z.string(),
});

function Login() {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: signinSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        email: value.username,
        password: value.password,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="username">
        {(field) => (
          <label htmlFor={field.name}>
            {field.name}:
            <input
              name={field.name}
              id={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <label htmlFor={field.name}>
            {field.name}:
            <input
              name={field.name}
              id={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;

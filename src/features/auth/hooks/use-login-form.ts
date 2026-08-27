import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/features/auth/hooks/use-login-mutation';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { toApiError } from '@/infrastructure/http/api-error';

export function useLoginForm() {
  const mutation = useLoginMutation();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { dni: '', password: '' },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      router.replace('/');
    } catch {
      // Mutation state exposes the normalized error to the screen.
    }
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    submit,
    isPending: mutation.isPending,
    error: mutation.error ? toApiError(mutation.error).message : null,
  };
}

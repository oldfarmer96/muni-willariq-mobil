import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/features/auth/hooks/use-register-mutation';
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/register.schema';
import { toApiError } from '@/infrastructure/http/api-error';

export function useRegisterForm() {
  const mutation = useRegisterMutation();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', dni: '', phone: '', password: '' },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({ ...values, lastName: values.lastName || undefined });
      router.replace({ pathname: '/login', params: { registered: '1', dni: values.dni } });
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

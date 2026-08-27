import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { FormInput } from '@/components/ui/form-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { useRegisterForm } from '@/features/auth/hooks/use-register-form';

export function RegisterScreen() {
  const register = useRegisterForm();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="px-5 py-12">
      <View className="mx-auto w-full max-w-md gap-8">
        <View className="gap-3">
          <Text className="text-sm font-black uppercase tracking-widest text-cyan-300">Cuenta ciudadana</Text>
          <Text className="text-4xl font-black tracking-tight text-white">Crea tu cuenta</Text>
          <Text className="text-base leading-6 text-slate-400">
            Tus datos permiten identificar y dar seguimiento seguro a tus reportes.
          </Text>
        </View>

        <View className="gap-5 rounded-3xl border border-white/10 bg-slate-900 p-5">
          <FormInput
            control={register.control}
            name="firstName"
            label="Nombres"
            placeholder="Maria Elena"
            autoCapitalize="words"
            autoComplete="name"
            error={register.errors.firstName?.message}
          />
          <FormInput
            control={register.control}
            name="lastName"
            label="Apellidos (opcional)"
            placeholder="Quispe Huaman"
            autoCapitalize="words"
            error={register.errors.lastName?.message}
          />
          <FormInput
            control={register.control}
            name="dni"
            label="DNI"
            placeholder="12345678"
            keyboardType="number-pad"
            error={register.errors.dni?.message}
          />
          <FormInput
            control={register.control}
            name="phone"
            label="Celular"
            placeholder="987654321"
            keyboardType="phone-pad"
            autoComplete="tel"
            error={register.errors.phone?.message}
          />
          <FormInput
            control={register.control}
            name="password"
            label="Contrasena"
            placeholder="Minimo 8 caracteres"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            error={register.errors.password?.message}
          />

          {register.error && (
            <View className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4">
              <Text selectable className="text-sm font-medium text-red-200">
                {register.error}
              </Text>
            </View>
          )}

          <SubmitButton
            label="Crear cuenta"
            loadingLabel="Creando cuenta..."
            isPending={register.isPending}
            onPress={register.submit}
          />
        </View>

        <View className="flex-row flex-wrap items-center justify-center gap-1 pb-8">
          <Text className="text-slate-400">Ya tienes una cuenta?</Text>
          <Link href="/login" className="font-black text-cyan-300">
            Inicia sesion
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

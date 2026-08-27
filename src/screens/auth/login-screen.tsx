import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { FormInput } from '@/components/ui/form-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';

export function LoginScreen() {
  const login = useLoginForm();
  const { registered } = useLocalSearchParams<{ registered?: string }>();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="min-h-full justify-center px-5 py-12">
      <View className="mx-auto w-full max-w-md gap-8">
        <View className="gap-3">
          <View className="self-start rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
            <Text className="text-xs font-black uppercase tracking-widest text-cyan-300">Willariq</Text>
          </View>
          <Text className="text-4xl font-black tracking-tight text-white">Bienvenido de nuevo</Text>
          <Text className="text-base leading-6 text-slate-400">
            Ingresa para reportar y seguir incidencias de tu municipio.
          </Text>
        </View>

        <View className="gap-5 rounded-3xl border border-white/10 bg-slate-900 p-5">
          {registered === '1' && (
            <View className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <Text className="text-sm font-semibold text-emerald-200">
                Tu cuenta fue creada. Ya puedes iniciar sesion.
              </Text>
            </View>
          )}

          <FormInput
            control={login.control}
            name="dni"
            label="DNI"
            placeholder="12345678"
            keyboardType="number-pad"
            autoComplete="off"
            error={login.errors.dni?.message}
          />
          <FormInput
            control={login.control}
            name="password"
            label="Contrasena"
            placeholder="Tu contrasena"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            error={login.errors.password?.message}
          />

          {login.error && (
            <View className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4">
              <Text selectable className="text-sm font-medium text-red-200">
                {login.error}
              </Text>
            </View>
          )}

          <SubmitButton
            label="Iniciar sesion"
            loadingLabel="Ingresando..."
            isPending={login.isPending}
            onPress={login.submit}
          />
        </View>

        <View className="flex-row flex-wrap items-center justify-center gap-1">
          <Text className="text-slate-400">Todavia no tienes cuenta?</Text>
          <Link href="/register" className="font-black text-cyan-300">
            Registrate
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

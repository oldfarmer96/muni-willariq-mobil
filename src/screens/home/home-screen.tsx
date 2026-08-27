import { ScrollView, Text, View } from 'react-native';

import { SubmitButton } from '@/components/ui/submit-button';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useAuthStore } from '@/features/auth/store/auth.store';

export function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="min-h-full justify-center px-5 py-12">
      <View className="mx-auto w-full max-w-xl gap-6">
        <Text className="text-sm font-black uppercase tracking-widest text-cyan-300">Willariq</Text>
        <Text className="text-4xl font-black tracking-tight text-white">
          Hola, {user?.firstName ?? 'ciudadano'}
        </Text>
        <Text className="text-base leading-6 text-slate-400">
          La sesion esta protegida. El siguiente modulo sera tu perfil y luego el reporte de incidencias.
        </Text>

        <View className="gap-3 rounded-3xl border border-white/10 bg-slate-900 p-5">
          <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">DNI</Text>
          <Text selectable className="text-xl font-bold text-white">
            {user?.dni}
          </Text>
        </View>

        <SubmitButton
          label="Cerrar sesion"
          loadingLabel="Cerrando sesion..."
          isPending={logout.isPending}
          onPress={() => logout.mutate()}
        />
      </View>
    </ScrollView>
  );
}

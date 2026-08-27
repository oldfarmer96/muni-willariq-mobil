import { Redirect } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '@/features/auth/store/auth.store';

export default function AppLayout() {
  const status = useAuthStore((state) => state.status);

  if (status === 'hydrating') {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  if (status === 'anonymous') return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#020617' } }} />;
}

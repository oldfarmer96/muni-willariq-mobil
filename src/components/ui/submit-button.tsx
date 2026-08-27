import { ActivityIndicator, Pressable, Text } from 'react-native';

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  isPending: boolean;
  onPress: () => void;
};

export function SubmitButton({ label, loadingLabel, isPending, onPress }: SubmitButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isPending}
      onPress={onPress}
      className="min-h-14 flex-row items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-5 active:bg-cyan-300 disabled:opacity-60">
      {isPending && <ActivityIndicator color="#083344" />}
      <Text className="text-base font-black text-cyan-950">{isPending ? loadingLabel : label}</Text>
    </Pressable>
  );
}

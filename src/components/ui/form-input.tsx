import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  error?: string;
  label: string;
  name: FieldPath<T>;
} & Pick<
  ComponentProps<typeof TextInput>,
  'autoCapitalize' | 'autoComplete' | 'keyboardType' | 'placeholder' | 'secureTextEntry'
>;

export function FormInput<T extends FieldValues>({
  control,
  error,
  label,
  name,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-slate-200">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            {...inputProps}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ?? ''}
            placeholderTextColor="#64748b"
            className={`min-h-14 rounded-2xl border bg-slate-900 px-4 text-base text-white outline-none ${
              error ? 'border-red-400' : 'border-slate-700 focus:border-cyan-400'
            }`}
          />
        )}
      />
      {error && <Text className="text-sm text-red-300">{error}</Text>}
    </View>
  );
}

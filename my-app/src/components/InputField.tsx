import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, typography } from '../constants/theme';

interface Props extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const InputField: React.FC<Props> = ({ label, value, onChangeText, error, ...rest }) => {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={{ ...typography.caption, color: colors.text, marginBottom: spacing.xs, fontWeight: '600' }}>{label}</Text>
      <TextInput
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: borderRadius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          ...typography.body,
          color: colors.text,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
        autoCorrect={false}
        {...rest}
      />
      {error && <Text style={{ ...typography.small, color: colors.error, marginTop: spacing.xs }}>{error}</Text>}
    </View>
  );
};

export default InputField;

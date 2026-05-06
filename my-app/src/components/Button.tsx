import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const containerStyle: ViewStyle[] = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.secondary,
    disabled ? styles.disabled : {},
    ...(style ? [style] : []),
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled ? styles.disabledText : {},
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});

export default Button;

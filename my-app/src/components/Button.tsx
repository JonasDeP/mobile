import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, typography } from '../constants/theme';

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
  const { colors } = useTheme();

  const containerStyle: ViewStyle = {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
    ...(variant === 'primary'
      ? { backgroundColor: colors.primary }
      : { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary }),
    ...(style as ViewStyle),
  };

  const textColor = disabled
    ? colors.textSecondary
    : variant === 'primary'
    ? colors.white
    : colors.primary;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={{ ...typography.body, fontWeight: '600', color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
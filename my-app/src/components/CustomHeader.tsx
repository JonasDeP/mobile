import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants/theme';

interface Props {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const CustomHeader: React.FC<Props> = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.lg + 20, paddingBottom: spacing.md }}>
      <View style={{ width: 40, alignItems: 'flex-start' }}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ ...typography.h2, color: colors.white, flex: 1, textAlign: 'center' }}>{title}</Text>
      <View style={{ width: 40, alignItems: 'flex-end' }}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
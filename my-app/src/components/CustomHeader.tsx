import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

interface Props {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const CustomHeader: React.FC<Props> = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg + 20,
    paddingBottom: spacing.md,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    ...typography.h2,
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default CustomHeader;

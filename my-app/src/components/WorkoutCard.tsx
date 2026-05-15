import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Workout } from '../types';
import { spacing, borderRadius, typography } from '../constants/theme';

interface Props {
  workout: Workout;
  onPress: () => void;
}

const WorkoutCard: React.FC<Props> = ({ workout, onPress }) => {
  const { colors } = useTheme();

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}u ${m}m` : `${h}u`;
  };

  return (
    <TouchableOpacity style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }} onPress={onPress} activeOpacity={0.7}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
        <Text style={{ ...typography.h3, color: colors.text, flex: 1, marginRight: spacing.sm }} numberOfLines={1}>{workout.title}</Text>
        <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.round }}>
          <Text style={{ ...typography.small, color: colors.primaryDark, fontWeight: '600' }}>{workout.muscleGroup}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...typography.caption, color: colors.textSecondary }}>{formatDuration(workout.duration)}</Text>
        <Text style={{ ...typography.caption, color: colors.textSecondary }}>{workout.exercises.length} oefeningen</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
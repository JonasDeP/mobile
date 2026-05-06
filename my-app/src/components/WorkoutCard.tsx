import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { Workout } from '../types';

interface Props {
  workout: Workout;
  onPress: () => void;
}

const WorkoutCard: React.FC<Props> = ({ workout, onPress }) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}u ${m}m` : `${h}u`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{workout.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{workout.muscleGroup}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.duration}>{formatDuration(workout.duration)}</Text>
        <Text style={styles.exercises}>{workout.exercises.length} oefeningen</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  badgeText: {
    ...typography.small,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  exercises: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default WorkoutCard;

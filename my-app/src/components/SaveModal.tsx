import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import Button from './Button';

interface ExerciseLog {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  restTime: number;
}

interface Props {
  visible: boolean;
  workoutTitle: string;
  exercises: ExerciseLog[];
  onConfirm: () => void;
  onCancel: () => void;
}

const SaveModal: React.FC<Props> = ({ visible, workoutTitle, exercises, onConfirm, onCancel }) => {
  const totalSets = exercises.reduce((sum, e) => sum + e.sets, 0);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Opslaan?</Text>
          <Text style={styles.subtitle}>{workoutTitle}</Text>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Oefeningen</Text>
              <Text style={styles.summaryValue}>{exercises.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Totale sets</Text>
              <Text style={styles.summaryValue}>{totalSets}</Text>
            </View>
          </View>

          <View style={styles.exerciseList}>
            {exercises.map((ex, i) => (
              <View key={i} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{ex.name}</Text>
                <Text style={styles.exerciseDetail}>{ex.sets} x {ex.reps} @ {ex.weight} kg</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <Button title="Annuleer" variant="secondary" onPress={onCancel} style={styles.actionBtn} />
            <Button title="Opslaan" onPress={onConfirm} style={styles.actionBtn} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  summary: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.primaryDark,
  },
  summaryValue: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  exerciseList: {
    marginBottom: spacing.lg,
    maxHeight: 200,
  },
  exerciseItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  exerciseDetail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
  },
});

export default SaveModal;

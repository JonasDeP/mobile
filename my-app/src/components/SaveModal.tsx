import React from 'react';
import { View, Text, Modal } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { spacing, borderRadius, typography } from '../constants/theme';

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
  const { colors } = useTheme();
  const totalSets = exercises.reduce((sum, e) => sum + e.sets, 0);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: spacing.lg }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.lg }}>
          <Text style={{ ...typography.h2, color: colors.text, textAlign: 'center' }}>Opslaan?</Text>
          <Text style={{ ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg }}>{workoutTitle}</Text>

          <View style={{ backgroundColor: colors.primaryLight, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              <Text style={{ ...typography.caption, color: colors.primaryDark }}>Oefeningen</Text>
              <Text style={{ ...typography.caption, color: colors.primaryDark, fontWeight: '700' }}>{exercises.length}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              <Text style={{ ...typography.caption, color: colors.primaryDark }}>Totale sets</Text>
              <Text style={{ ...typography.caption, color: colors.primaryDark, fontWeight: '700' }}>{totalSets}</Text>
            </View>
          </View>

          <View style={{ marginBottom: spacing.lg, maxHeight: 200 }}>
            {exercises.map((ex, i) => (
              <View key={i} style={{ paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <Text style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>{ex.name}</Text>
                <Text style={{ ...typography.caption, color: colors.textSecondary }}>{ex.sets} x {ex.reps} @ {ex.weight} kg</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Button title="Annuleer" variant="secondary" onPress={onCancel} style={{ flex: 1 }} />
            <Button title="Opslaan" onPress={onConfirm} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SaveModal;
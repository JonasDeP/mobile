import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import Button from './Button';
import { FilterState } from '../types';

const MUSCLE_GROUPS = ['Alles', 'Borst', 'Rug', 'Benen', 'Schouders', 'Armen', 'Core'];
const DIFFICULTIES = ['Alles', 'Beginner', 'Gevorderd', 'Expert'];

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const FilterModal: React.FC<Props> = ({ visible, onClose, onApply }) => {
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Alles');

  const handleApply = () => {
    onApply({ muscleGroup: selectedMuscle, difficulty: selectedDifficulty });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Filter Oefeningen</Text>

          <Text style={styles.sectionTitle}>Spiergroep</Text>
          <View style={styles.chipContainer}>
            {MUSCLE_GROUPS.map((group) => (
              <TouchableOpacity
                key={group}
                style={[styles.chip, selectedMuscle === group && styles.chipSelected]}
                onPress={() => setSelectedMuscle(group)}
              >
                <Text style={[styles.chipText, selectedMuscle === group && styles.chipTextSelected]}>
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Moeilijkheid</Text>
          <View style={styles.chipContainer}>
            {DIFFICULTIES.map((diff) => (
              <TouchableOpacity
                key={diff}
                style={[styles.chip, selectedDifficulty === diff && styles.chipSelected]}
                onPress={() => setSelectedDifficulty(diff)}
              >
                <Text style={[styles.chipText, selectedDifficulty === diff && styles.chipTextSelected]}>
                  {diff}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <Button title="Annuleer" variant="secondary" onPress={onClose} style={styles.actionBtn} />
            <Button title="Toepassen" onPress={handleApply} style={styles.actionBtn} />
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xl + 20,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.white,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
  },
});

export default FilterModal;

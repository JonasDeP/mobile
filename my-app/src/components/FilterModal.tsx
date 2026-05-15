import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { FilterState } from '../types';
import { spacing, borderRadius, typography } from '../constants/theme';

const MUSCLE_GROUPS = ['Alles', 'Borst', 'Rug', 'Benen', 'Schouders', 'Armen', 'Core'];
const DIFFICULTIES = ['Alles', 'Beginner', 'Gevorderd', 'Expert'];

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const FilterModal: React.FC<Props> = ({ visible, onClose, onApply }) => {
  const { colors } = useTheme();
  const [selectedMuscle, setSelectedMuscle] = useState('Alles');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Alles');

  const handleApply = () => {
    onApply({ muscleGroup: selectedMuscle, difficulty: selectedDifficulty });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg, paddingBottom: spacing.xl + 20 }}>
          <Text style={{ ...typography.h2, color: colors.text, marginBottom: spacing.lg, textAlign: 'center' }}>Filter Oefeningen</Text>

          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 1 }}>Spiergroep</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg, gap: spacing.sm }}>
            {MUSCLE_GROUPS.map((group) => (
              <TouchableOpacity
                key={group}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.round,
                  borderWidth: 1,
                  borderColor: selectedMuscle === group ? colors.primary : colors.border,
                  backgroundColor: selectedMuscle === group ? colors.primary : 'transparent',
                }}
                onPress={() => setSelectedMuscle(group)}
              >
                <Text style={{
                  ...typography.caption,
                  color: selectedMuscle === group ? colors.white : colors.text,
                }}>
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 1 }}>Moeilijkheid</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg, gap: spacing.sm }}>
            {DIFFICULTIES.map((diff) => (
              <TouchableOpacity
                key={diff}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.round,
                  borderWidth: 1,
                  borderColor: selectedDifficulty === diff ? colors.primary : colors.border,
                  backgroundColor: selectedDifficulty === diff ? colors.primary : 'transparent',
                }}
                onPress={() => setSelectedDifficulty(diff)}
              >
                <Text style={{
                  ...typography.caption,
                  color: selectedDifficulty === diff ? colors.white : colors.text,
                }}>
                  {diff}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Button title="Annuleer" variant="secondary" onPress={onClose} style={{ flex: 1 }} />
            <Button title="Toepassen" onPress={handleApply} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
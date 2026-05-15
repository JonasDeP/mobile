import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FilterModal from '../components/FilterModal';
import { FilterState } from '../types';
import { spacing, borderRadius, typography } from '../constants/theme';

const MOCK_EXERCISES = [
  { id: '1', name: 'Bankdrukken', muscleGroup: 'Borst', difficulty: 'Gevorderd' },
  { id: '2', name: 'Squats', muscleGroup: 'Benen', difficulty: 'Beginner' },
  { id: '3', name: 'Deadlift', muscleGroup: 'Rug', difficulty: 'Expert' },
  { id: '4', name: 'Shoulder Press', muscleGroup: 'Schouders', difficulty: 'Gevorderd' },
  { id: '5', name: 'Bicep Curls', muscleGroup: 'Armen', difficulty: 'Beginner' },
];

interface Props {
  navigation: any;
}

const TrainingScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ muscleGroup: 'Alles', difficulty: 'Alles' });

  const filteredExercises = MOCK_EXERCISES.filter((ex) => {
    if (filters.muscleGroup !== 'Alles' && ex.muscleGroup !== filters.muscleGroup) return false;
    if (filters.difficulty !== 'Alles' && ex.difficulty !== filters.difficulty) return false;
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title="Training"
        rightIcon={<Text style={{ fontSize: 20, color: colors.white }}>⚙</Text>}
        onRightPress={() => setFilterVisible(true)}
      />
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
          >
            <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.round }}>
                <Text style={{ ...typography.small, color: colors.primaryDark }}>{item.muscleGroup}</Text>
              </View>
              <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.round }}>
                <Text style={{ ...typography.small, color: colors.primaryDark }}>{item.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: spacing.md }}
      />
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(newFilters) => setFilters(newFilters)}
      />
    </View>
  );
};

export default TrainingScreen;
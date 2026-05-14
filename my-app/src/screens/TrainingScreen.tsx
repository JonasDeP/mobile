import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import CustomHeader from '../components/CustomHeader';
import FilterModal from '../components/FilterModal';
import { FilterState } from '../types';

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
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ muscleGroup: 'Alles', difficulty: 'Alles' });

  const filteredExercises = MOCK_EXERCISES.filter((ex) => {
    if (filters.muscleGroup !== 'Alles' && ex.muscleGroup !== filters.muscleGroup) return false;
    if (filters.difficulty !== 'Alles' && ex.difficulty !== filters.difficulty) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Training"
        rightIcon={<Text style={styles.filterIcon}>⚙</Text>}
        onRightPress={() => setFilterVisible(true)}
      />
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseCard}
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
          >
            <Text style={styles.exerciseName}>{item.name}</Text>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.muscleGroup}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(newFilters) => setFilters(newFilters)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  filterIcon: {
    fontSize: 20,
    color: colors.white,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  exerciseName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  tagText: {
    ...typography.small,
    color: colors.primaryDark,
  },
});

export default TrainingScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FilterModal from '../components/FilterModal';
import { FilterState, ExerciseItem } from '../types';
import { getExercises } from '../services/firestore';
import { spacing, borderRadius, typography } from '../constants/theme';

const MUSCLE_GROUPS = ['Alles', 'Borst', 'Rug', 'Benen', 'Schouders', 'Armen', 'Buik'];

interface Props {
  navigation: any;
}

const TrainingScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ muscleGroup: 'Alles', difficulty: 'Alles' });
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExercises()
      .then((data) => {
        if (data.length > 0) setExercises(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    if (filters.muscleGroup !== 'Alles' && ex.muscleGroup !== filters.muscleGroup) return false;
    if (filters.difficulty !== 'Alles' && ex.difficulty !== filters.difficulty) return false;
    if (search && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title="Training"
        rightIcon={<Text style={{ fontSize: 20, color: colors.white }}>⚙</Text>}
        onRightPress={() => setFilterVisible(true)}
      />

      {/* Search bar */}
      <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Zoek oefening..."
          placeholderTextColor={colors.textSecondary}
          style={{
            backgroundColor: colors.surface,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        />
      </View>

      {/* Muscle group filter chips */}
      <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.sm }}>
        <FlatList
          horizontal
          data={MUSCLE_GROUPS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setFilters((f) => ({ ...f, muscleGroup: item }))}
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.round,
                marginRight: spacing.xs,
                backgroundColor: filters.muscleGroup === item ? colors.primary : colors.surface,
              }}
            >
              <Text style={{ color: filters.muscleGroup === item ? colors.white : colors.text, fontSize: 13 }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: spacing.xl }}>
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={{ color: colors.textSecondary }}>Geen oefeningen gevonden.</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md, marginHorizontal: spacing.md }}
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
          >
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 160, backgroundColor: colors.border }} />
            <View style={{ padding: spacing.md }}>
              <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.round }}>
                  <Text style={{ ...typography.small, color: colors.primaryDark }}>{item.muscleGroup}</Text>
                </View>
                <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.round }}>
                  <Text style={{ ...typography.small, color: colors.primaryDark }}>{item.difficulty}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
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
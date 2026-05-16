import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { WorkoutHistoryEntry, WeightEntry, GymVisit } from '../types';
import { getWorkoutHistory, saveWeightEntry, getWeightHistory, saveGymVisit, removeGymVisit, getGymVisits } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';
import { spacing, borderRadius, typography } from '../constants/theme';
import WeightChart from '../components/WeightChart';
import WeekCalendar from '../components/WeekCalendar';

const StatsScreen: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [visits, setVisits] = useState<GymVisit[]>([]);
  const [weightInput, setWeightInput] = useState('');

  useEffect(() => {
    if (!user) return;
    loadAll();
  }, [user]);

  const loadAll = async () => {
    if (!user) return;
    try {
      const [h, w, v] = await Promise.all([
        getWorkoutHistory(user.uid),
        getWeightHistory(user.uid),
        getGymVisits(user.uid),
      ]);
      setHistory(h);
      setWeights(w);
      setVisits(v);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleSaveWeight = async () => {
    if (!user) return;
    const val = parseFloat(weightInput);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Ongeldig gewicht', 'Voer een positief getal in');
      return;
    }
    try {
      await saveWeightEntry(user.uid, val);
      setWeightInput('');
      const w = await getWeightHistory(user.uid);
      setWeights(w);
    } catch (error) {
      Alert.alert('Fout', 'Kon gewicht niet opslaan');
    }
  };

  const handleToggleVisit = async (dateString: string) => {
    if (!user) return;
    const existing = visits.find((v) => v.date === dateString);
    try {
      if (existing && existing.id) {
        await removeGymVisit(user.uid, existing.id);
        setVisits(visits.filter((v) => v.id !== existing.id));
      } else {
        const id = await saveGymVisit(user.uid, dateString);
        if (id) {
          setVisits((prev) => [...prev, { id, date: dateString }]);
        }
      }
    } catch (error) {
      Alert.alert('Fout', 'Kon bezoek niet opslaan');
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const visitedDates = visits.map((v) => v.date);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Statistieken" />
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {/* Top stats row */}
        <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg }}>
          <View style={{ flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' }}>
            <Text style={{ ...typography.h1, color: colors.white }}>{history.length}</Text>
            <Text style={{ ...typography.caption, color: colors.white, marginTop: spacing.xs }}>Workouts</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' }}>
            <Text style={{ ...typography.h1, color: colors.white }}>{visits.length}</Text>
            <Text style={{ ...typography.caption, color: colors.white, marginTop: spacing.xs }}>Bezoeken</Text>
          </View>
        </View>

        {/* Weight input */}
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Gewicht</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <TextInput
              value={weightInput}
              onChangeText={setWeightInput}
              placeholder="kg"
              keyboardType="decimal-pad"
              placeholderTextColor={colors.textSecondary}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: borderRadius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                color: colors.text,
                backgroundColor: colors.background,
              }}
            />
            <TouchableOpacity
              onPress={handleSaveWeight}
              style={{ backgroundColor: colors.primary, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, justifyContent: 'center' }}
            >
              <Text style={{ color: colors.white, fontWeight: '600' }}>Opslaan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weight chart */}
        <WeightChart entries={weights} />

        {/* Week calendar */}
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Deze week</Text>
          <WeekCalendar visitedDates={visitedDates} onToggleDate={handleToggleVisit} />
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' }}>
            Tik een dag aan om aan te geven dat je bent geweest
          </Text>
        </View>

        {/* Recent workouts */}
        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Recente Workouts</Text>
        {history.length === 0 ? (
          <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary }}>Nog geen workouts gelogd</Text>
          </View>
        ) : (
          history.slice(0, 10).map((item) => (
            <View key={item.id} style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
              <Text style={{ ...typography.h3, color: colors.text }}>{item.workoutTitle}</Text>
              <Text style={{ ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs }}>{formatDate(item.completedAt)}</Text>
              <Text style={{ ...typography.caption, color: colors.textSecondary }}>{item.exercises.length} oefeningen</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { WorkoutHistoryEntry } from '../types';
import { getWorkoutHistory } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';
import { spacing, borderRadius, typography } from '../constants/theme';

const StatsScreen: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;
      try {
        const data = await getWorkoutHistory(user.uid);
        setHistory(data);
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };
    loadHistory();
  }, [user]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Statistieken" />
      <View style={{ flexDirection: 'row', padding: spacing.md, gap: spacing.md }}>
        <View style={{ flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' }}>
          <Text style={{ ...typography.h1, color: colors.white }}>{history.length}</Text>
          <Text style={{ ...typography.caption, color: colors.white, marginTop: spacing.xs }}>Totale Workouts</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' }}>
          <Text style={{ ...typography.h1, color: colors.white }}>{history.reduce((sum, h) => sum + h.exercises.length, 0)}</Text>
          <Text style={{ ...typography.caption, color: colors.white, marginTop: spacing.xs }}>Totale Oefeningen</Text>
        </View>
      </View>
      <Text style={{ ...typography.h3, color: colors.text, paddingHorizontal: spacing.md, marginBottom: spacing.sm }}>Recente Workouts</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
            <Text style={{ ...typography.h3, color: colors.text }}>{item.workoutTitle}</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs }}>{formatDate(item.completedAt)}</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary }}>{item.exercises.length} oefeningen</Text>
          </View>
        )}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <View style={{ padding: spacing.xl, alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary }}>Nog geen workouts gelogd</Text>
          </View>
        }
      />
    </View>
  );
};

export default StatsScreen;
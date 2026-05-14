import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import CustomHeader from '../components/CustomHeader';
import { WorkoutHistoryEntry } from '../types';
import { getWorkoutHistory } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';

const StatsScreen: React.FC = () => {
  const { user } = useAuth();
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
    <View style={styles.container}>
      <CustomHeader title="Statistieken" />
      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{history.length}</Text>
          <Text style={styles.summaryLabel}>Totale Workouts</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{history.reduce((sum, h) => sum + h.exercises.length, 0)}</Text>
          <Text style={styles.summaryLabel}>Totale Oefeningen</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Recente Workouts</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>{item.workoutTitle}</Text>
            <Text style={styles.historyDate}>{formatDate(item.completedAt)}</Text>
            <Text style={styles.historyDetail}>{item.exercises.length} oefeningen</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nog geen workouts gelogd</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summary: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  summaryValue: {
    ...typography.h1,
    color: colors.white,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.white,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  list: {
    padding: spacing.md,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  historyTitle: {
    ...typography.h3,
    color: colors.text,
  },
  historyDate: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  historyDetail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
  },
});

export default StatsScreen;

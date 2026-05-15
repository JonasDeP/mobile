import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import WorkoutCard from '../components/WorkoutCard';
import { Workout } from '../types';
import { getWorkoutSchemas } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';
import { spacing, typography } from '../constants/theme';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadWorkouts = async () => {
    if (!user) return;
    try {
      const data = await getWorkoutSchemas(user.uid);
      setWorkouts(data);
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWorkouts();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Mijn Workouts" />
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard workout={item} onPress={() => console.log('Workout tapped:', item.id)} />
        )}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={{ padding: spacing.xl, alignItems: 'center' }}>
            <Text style={{ ...typography.body, color: colors.textSecondary }}>Nog geen workouts</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
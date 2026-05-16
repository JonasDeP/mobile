import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation<any>();
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
    const unsubscribe = navigation.addListener('focus', loadWorkouts);
    return unsubscribe;
  }, [user, navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWorkouts();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title="Mijn Workouts"
        rightIcon={<Text style={{ fontSize: 22, color: colors.white }}>+</Text>}
        onRightPress={() => navigation.navigate('CreateWorkout')}
      />
      <FlatList
        data={workouts.filter((w) => w.id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard workout={item} onPress={() => navigation.navigate('TrainingTab', { screen: 'Log', params: { workout: item } })} />
        )}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={{ padding: spacing.xl, alignItems: 'center' }}>
            <Text style={{ ...typography.body, color: colors.textSecondary }}>Nog geen workouts</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout')} style={{ marginTop: spacing.md }}>
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 16 }}>+ Workout aanmaken</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
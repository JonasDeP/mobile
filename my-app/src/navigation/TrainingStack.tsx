import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingScreen from '../screens/TrainingScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import LogScreen from '../screens/LogScreen';

const Stack = createStackNavigator();

const TrainingStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Training" component={TrainingScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="Log" component={LogScreen} />
    </Stack.Navigator>
  );
};

export default TrainingStack;

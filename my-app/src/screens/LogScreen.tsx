import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SaveModal from '../components/SaveModal';
import { ValidationErrors } from '../types';
import { addToHistory } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';
import { spacing, borderRadius } from '../constants/theme';

interface Props {
  route: any;
  navigation: any;
}

interface LogEntry {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  restTime: string;
}

const LogScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const params = route.params as any;

  // Support both single exercise (from TrainingScreen) and full workout (from HomeScreen)
  const isWorkout = !!(params.workout && params.workout.exercises);

  const workoutTitle = isWorkout ? params.workout.title : params.exercise?.name || 'Workout';
  const exercises = isWorkout ? params.workout.exercises : [params.exercise];

  const [logs, setLogs] = useState<Record<number, LogEntry>>(
    Object.fromEntries(exercises.map((ex: any, i: number) => [i, {
      name: ex.name || '',
      sets: String(ex.sets ?? ''),
      reps: String(ex.reps ?? ''),
      weight: ex.weight ? String(ex.weight) : '',
      restTime: String(ex.restTime ?? ''),
    }]))
  );
  const [errors, setErrors] = useState<Record<number, ValidationErrors>>({});
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const updateLog = (index: number, field: keyof LogEntry, value: string) => {
    setLogs((prev) => ({ ...prev, [index]: { ...prev[index], [field]: value } }));
  };

  const validate = (): boolean => {
    const newErrors: Record<number, ValidationErrors> = {};
    let valid = true;
    exercises.forEach((_: any, i: number) => {
      const l = logs[i];
      const e: ValidationErrors = {};
      if (!l.sets || parseInt(l.sets) <= 0) { e.sets = 'Moet positief zijn'; valid = false; }
      if (!l.reps || parseInt(l.reps) <= 0) { e.reps = 'Moet positief zijn'; valid = false; }
      if (!l.weight || parseFloat(l.weight) < 0) { e.weight = 'Ongeldig'; valid = false; }
      if (!l.restTime || parseInt(l.restTime) < 0) { e.restTime = 'Ongeldig'; valid = false; }
      if (Object.keys(e).length > 0) newErrors[i] = e;
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaveModalVisible(true);
  };

  const confirmSave = async () => {
    if (!user) return;
    try {
      const historyExercises = exercises.map((ex: any, i: number) => {
        const l = logs[i];
        return {
          name: ex.name,
          sets: parseInt(l.sets) || 0,
          reps: parseInt(l.reps) || 0,
          weight: parseFloat(l.weight) || 0,
          restTime: parseInt(l.restTime) || 0,
        };
      });
      await addToHistory(user.uid, {
        workoutId: isWorkout ? params.workout.id : params.exercise?.id || '',
        workoutTitle,
        completedAt: new Date().toISOString(),
        exercises: historyExercises,
      });
      setSaveModalVisible(false);
      Alert.alert('Opgeslagen!', 'Je workout is opgeslagen.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.popToTop();
            navigation.getParent()?.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Fout', 'Kon workout niet opslaan');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title={isWorkout ? 'Workout Loggen' : 'Log Oefening'}
        showBack
        onBack={() => navigation.navigate('Home')}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: spacing.lg, textAlign: 'center' }}>
          {workoutTitle}
        </Text>

        {exercises.map((ex: any, i: number) => (
          <View
            key={ex.id || i}
            style={{
              backgroundColor: colors.surface,
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              marginBottom: spacing.md,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.sm }}>
              {ex.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Sets"
                  value={logs[i]?.sets || ''}
                  onChangeText={(v) => updateLog(i, 'sets', v)}
                  error={errors[i]?.sets}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Reps"
                  value={logs[i]?.reps || ''}
                  onChangeText={(v) => updateLog(i, 'reps', v)}
                  error={errors[i]?.reps}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Gewicht (kg)"
                  value={logs[i]?.weight || ''}
                  onChangeText={(v) => updateLog(i, 'weight', v)}
                  error={errors[i]?.weight}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Rust (sec)"
                  value={logs[i]?.restTime || ''}
                  onChangeText={(v) => updateLog(i, 'restTime', v)}
                  error={errors[i]?.restTime}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
        ))}

        <Button title="Opslaan" onPress={handleSave} style={{ marginTop: spacing.sm }} />
      </ScrollView>

      <SaveModal
        visible={saveModalVisible}
        workoutTitle={workoutTitle}
        exercises={exercises.map((ex: any, i: number) => {
          const l = logs[i];
          return {
            name: ex.name,
            sets: parseInt(l.sets) || 0,
            reps: parseInt(l.reps) || 0,
            weight: parseFloat(l.weight) || 0,
            restTime: parseInt(l.restTime) || 0,
          };
        })}
        onConfirm={confirmSave}
        onCancel={() => setSaveModalVisible(false)}
      />
    </View>
  );
};

export default LogScreen;
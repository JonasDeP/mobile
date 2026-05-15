import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SaveModal from '../components/SaveModal';
import { LogFormData, ValidationErrors } from '../types';
import { addToHistory } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';
import { spacing } from '../constants/theme';

interface Props {
  route: any;
  navigation: any;
}

const LogScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise } = route.params as { exercise: { id: string; name: string } };
  const { user } = useAuth();
  const { colors } = useTheme();
  const [form, setForm] = useState<LogFormData>({ sets: '', reps: '', weight: '', restTime: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!form.sets || parseInt(form.sets) <= 0) newErrors.sets = 'Sets moet positief zijn';
    if (!form.reps || parseInt(form.reps) <= 0) newErrors.reps = 'Reps moet positief zijn';
    if (!form.weight || parseFloat(form.weight) <= 0) newErrors.weight = 'Gewicht moet positief zijn';
    if (!form.restTime || parseInt(form.restTime) < 0) newErrors.restTime = 'Rusttijd moet 0 of meer zijn';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaveModalVisible(true);
  };

  const confirmSave = async () => {
    if (!user) return;
    try {
      await addToHistory(user.uid, {
        id: '',
        workoutId: exercise.id,
        workoutTitle: exercise.name,
        completedAt: new Date().toISOString(),
        exercises: [
          {
            name: exercise.name,
            sets: parseInt(form.sets),
            reps: parseInt(form.reps),
            weight: parseFloat(form.weight),
            restTime: parseInt(form.restTime),
          },
        ],
      });
      setSaveModalVisible(false);
      Alert.alert('Opgeslagen!', 'Je workout is opgeslagen.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Fout', 'Kon workout niet opslaan');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title="Log Workout"
        leftIcon={<Text style={{ fontSize: 24, color: colors.white }}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: spacing.lg, textAlign: 'center' }}>{exercise.name}</Text>
        <InputField
          label="Sets"
          value={form.sets}
          onChangeText={(text) => setForm({ ...form, sets: text })}
          error={errors.sets}
          keyboardType="number-pad"
        />
        <InputField
          label="Reps"
          value={form.reps}
          onChangeText={(text) => setForm({ ...form, reps: text })}
          error={errors.reps}
          keyboardType="number-pad"
        />
        <InputField
          label="Gewicht (kg)"
          value={form.weight}
          onChangeText={(text) => setForm({ ...form, weight: text })}
          error={errors.weight}
          keyboardType="decimal-pad"
        />
        <InputField
          label="Rusttijd (seconden)"
          value={form.restTime}
          onChangeText={(text) => setForm({ ...form, restTime: text })}
          error={errors.restTime}
          keyboardType="number-pad"
        />
        <Button title="Opslaan" onPress={handleSave} style={{ marginTop: spacing.lg }} />
      </ScrollView>
      <SaveModal
        visible={saveModalVisible}
        workoutTitle={exercise.name}
        exercises={[
          {
            name: exercise.name,
            sets: parseInt(form.sets) || 0,
            reps: parseInt(form.reps) || 0,
            weight: parseFloat(form.weight) || 0,
            restTime: parseInt(form.restTime) || 0,
          },
        ]}
        onConfirm={confirmSave}
        onCancel={() => setSaveModalVisible(false)}
      />
    </View>
  );
};

export default LogScreen;
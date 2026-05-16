import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { saveWorkout } from '../services/firestore';
import CustomHeader from '../components/CustomHeader';
import { EXERCISES, MUSCLE_GROUPS as MUSCLE_GROUP_OPTIONS } from '../data/exercises';
import { spacing, borderRadius, typography } from '../constants/theme';

interface SelectedExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: string;
  reps: string;
  weight: string;
}

const CreateWorkoutScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Borst');
  const [exercises, setExercises] = useState<SelectedExercise[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredExercises = EXERCISES.filter(
    (ex) => !exercises.find((s) => s.id === ex.id) &&
      (search === '' || ex.name.toLowerCase().includes(search.toLowerCase()))
  );

  const pickExercise = (ex: { id: string; name: string; muscleGroup: string }) => {
    setExercises((prev) => [
      ...prev,
      { id: ex.id, name: ex.name, muscleGroup: ex.muscleGroup, sets: '3', reps: '10', weight: '' },
    ]);
    setPickerVisible(false);
    setSearch('');
  };

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExercise = (id: string, field: string, value: string) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = async () => {
    if (!user) return;
    if (!title.trim()) { Alert.alert('Titel ontbreekt', 'Geef de workout een naam'); return; }
    if (exercises.length === 0) { Alert.alert('Oefeningen ontbreken', 'Voeg minstens één oefening toe'); return; }

    try {
      await saveWorkout(user.uid, {
        title: title.trim(),
        muscleGroup,
        duration: 60,
        date: new Date().toISOString(),
        exercises: exercises.map((e) => ({
          id: e.id,
          name: e.name,
          muscleGroup: e.muscleGroup,
          description: '',
          sets: parseInt(e.sets) || 3,
          reps: parseInt(e.reps) || 10,
          weight: parseFloat(e.weight) || 0,
          restTime: 60,
        })),
      });
      navigation.goBack();
    } catch {
      Alert.alert('Fout', 'Kon workout niet opslaan');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Workout Aanmaken" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>

        <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs }}>Naam workout</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="bijv. Borst & Triceps"
          placeholderTextColor={colors.textSecondary}
          style={{
            backgroundColor: colors.surface, borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
            color: colors.text, fontSize: 16, marginBottom: spacing.lg,
            borderWidth: 1, borderColor: colors.border,
          }}
        />

        <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm }}>Spiergroep</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
          {['Borst', 'Rug', 'Benen', 'Schouders', 'Armen', 'Buik'].map((mg) => (
            <TouchableOpacity
              key={mg}
              onPress={() => setMuscleGroup(mg)}
              style={{
                paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
                borderRadius: borderRadius.round, marginRight: spacing.sm,
                backgroundColor: muscleGroup === mg ? colors.primary : colors.surface,
              }}
            >
              <Text style={{ color: muscleGroup === mg ? colors.white : colors.text, fontWeight: '600' }}>{mg}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.sm }}>Oefeningen</Text>

        {exercises.length === 0 && (
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md }}>
            Nog geen oefeningen gekozen
          </Text>
        )}

        {exercises.map((ex) => (
          <View
            key={ex.id}
            style={{
              backgroundColor: colors.surface, borderRadius: borderRadius.lg,
              padding: spacing.md, marginBottom: spacing.md,
              borderWidth: 1, borderColor: colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <Text style={{ flex: 1, ...typography.body, color: colors.text, fontWeight: '600' }}>{ex.name}</Text>
              <TouchableOpacity onPress={() => removeExercise(ex.id)} style={{ padding: spacing.xs }}>
                <Text style={{ color: colors.error, fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              {[
                { label: 'Sets', field: 'sets', val: ex.sets },
                { label: 'Reps', field: 'reps', val: ex.reps },
                { label: 'kg', field: 'weight', val: ex.weight },
              ].map(({ label, field, val }) => (
                <View key={field} style={{ flex: 1 }}>
                  <Text style={{ ...typography.small, color: colors.textSecondary, marginBottom: 4 }}>{label}</Text>
                  <TextInput
                    value={val}
                    onChangeText={(v) => updateExercise(ex.id, field, v)}
                    keyboardType="number-pad"
                    placeholder={label}
                    placeholderTextColor={colors.textSecondary}
                    style={{
                      borderWidth: 1, borderColor: colors.border,
                      borderRadius: borderRadius.md, paddingHorizontal: spacing.sm,
                      paddingVertical: spacing.xs, color: colors.text,
                      textAlign: 'center', fontSize: 15,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={{
            borderWidth: 1, borderColor: colors.primary,
            borderRadius: borderRadius.lg, borderStyle: 'dashed',
            padding: spacing.md, alignItems: 'center', marginBottom: spacing.lg,
          }}
        >
          <Text style={{ color: colors.primary, fontWeight: '600' }}>+ Oefening kiezen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: exercises.length > 0 && title.trim() ? colors.primary : colors.border,
            borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.white, fontWeight: '700', fontSize: 16 }}>Workout Opslaan</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Exercise Picker Modal */}
      <Modal visible={pickerVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ ...typography.h3, color: colors.text }}>Kies Oefening</Text>
              <TouchableOpacity onPress={() => { setPickerVisible(false); setSearch(''); }}>
                <Text style={{ color: colors.primary, fontSize: 28 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: spacing.md }}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Zoek oefening..."
                placeholderTextColor={colors.textSecondary}
                style={{
                  backgroundColor: colors.surface, borderRadius: borderRadius.md,
                  paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
                  color: colors.text, borderWidth: 1, borderColor: colors.border,
                }}
              />
            </View>

            <FlatList
              data={filteredExercises}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => pickExercise(item)}
                  style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}
                >
                  <Text style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>{item.name}</Text>
                  <Text style={{ ...typography.caption, color: colors.textSecondary }}>{item.muscleGroup} · {item.difficulty}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ padding: spacing.xl, alignItems: 'center' }}>
                  <Text style={{ color: colors.textSecondary }}>Geen oefeningen beschikbaar</Text>
                </View>
              }
              style={{ maxHeight: 400 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateWorkoutScreen;